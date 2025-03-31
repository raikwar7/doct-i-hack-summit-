from flask import Flask, render_template, send_file,request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS
from recommendation import recommend_doctor
import tensorflow as tf
from PIL import Image
import os
from xhtml2pdf import pisa
import io


app = Flask(__name__)
CORS(app)  # Enable CORS for frontend JS

# Load Disease Prediction Model
with open("models/disease_model (1).pkl", "rb") as file:
    disease_model, le, unique_symp = pickle.load(file)

# Load Disease to Specialization Mapping
df = pd.read_csv("dataset/updated_disease_to_specialization.csv")
disease_to_speciality = dict(zip(df['Disease'].str.lower(), df['Specialization']))

# Load Description and Precaution Data
desc_df = pd.read_csv("dataset/symptom_Description.csv")
precaution_df = pd.read_csv("dataset/symptom_precaution (3).csv")
desc_df.columns = desc_df.columns.str.strip()
precaution_df.columns = precaution_df.columns.str.strip()

# Utility: Convert Symptoms to Vector
def sym_to_vec(symptoms, symptom_list):
    symptoms_set = set(symptoms.split(","))
    return [1 if symptom in symptoms_set else 0 for symptom in symptom_list]

# Disease Prediction Logic
def predict_disease(input_symptoms):
    input_vector = np.array(sym_to_vec(",".join(input_symptoms).lower(), unique_symp)).reshape(1, -1)
    probabilities = disease_model.predict_proba(input_vector)[0]

    disease_probabilities = {
        le.inverse_transform([i])[0]: round(prob * 100, 2)
        for i, prob in enumerate(probabilities)
    }

    # Top 7 Predictions
    top_7_diseases = sorted(disease_probabilities.items(), key=lambda x: x[1], reverse=True)[:7]
    return top_7_diseases

# Fetch Description and Precautions
def get_precaution_and_symptoms(disease_name):
    """Retrieve disease description and precautions."""
    result = desc_df[desc_df["Disease"].str.lower() == disease_name.lower()]
    if not result.empty:
        description = result.iloc[0].get("Description", "No description available")
        precautions = precaution_df[precaution_df["Disease"].str.lower() == disease_name.lower()].iloc[:, 1:].values.flatten().tolist()
        precautions = [p for p in precautions if isinstance(p, str)]
        return description, precautions if precautions else ["No Precautions Available"]
    return "No description available", ["No Precautions Available"]

# Home Route
@app.route("/")
def home():
    return render_template("index.html", symptoms=unique_symp)

# Load trained image model once
model = tf.keras.models.load_model("skin_disease_model_v2.h5")

# Load class names
with open("class_names.pkl", "rb") as file:
    class_names = pickle.load(file)

# Function to preprocess image
def preprocess_image(image):
    img = image.resize((128, 128))  # Resize to match model input size
    img = np.array(img) / 255.0  # Normalize pixel values
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# ✅ Prediction Route (Allows POST requests)
@app.route("/predictimg/", methods=["POST"])
def predicts_img():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"})
    
    file = request.files['file']
    image = Image.open(file).convert("RGB")  # Open uploaded image
    processed_img = preprocess_image(image)  # Preprocess image

    predictions = model.predict(processed_img)
    predicted_class = class_names[np.argmax(predictions)]
    confidence = np.max(predictions)

    return jsonify({"predicted_class": predicted_class, "confidence": float(confidence)})

# Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    symptoms = request.form.getlist("symptoms")
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    top_7_predictions = predict_disease(symptoms)
    if not top_7_predictions:
        return jsonify({"error": "No predictions available"}), 500

    # Select top predictions
    top_1 = top_7_predictions[0]
    top_2 = top_7_predictions[1]
    top_3 = top_7_predictions[2] if len(top_7_predictions) > 2 else None

    selected_diseases = [top_1, top_2]
    if top_3 and (top_3[1] == top_1[1] or top_3[1] == top_2[1]):
        selected_diseases.append(top_3)

    disease_details = []
    for disease, confidence in selected_diseases:
        description, precautions = get_precaution_and_symptoms(disease)
        disease_details.append({
            "disease": disease,
            "confidence": confidence,
            "description": description,
            "precautions": precautions
        })

    return jsonify({
        "selected_diseases": disease_details,
        "top_7": top_7_predictions
    })

# Provide Disease and Location Options Dynamically
@app.route('/get_options')
def get_options():
    diseases = sorted(df['Disease'].unique().tolist())  # Fetch diseases from your dataset
    # Static unique locations
    locations = ['Hyderabad', 'Mumbai', 'Pune', 'Bangalore', 'Kolkata', 
                 'Jaipur', 'Chennai', 'Ahmedabad', 'Lucknow', 'Delhi']
    return jsonify({"diseases": diseases, "locations": locations})

# Doctor Recommendation API
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    disease = data.get('disease')
    location = data.get('location')

    if not disease or not location:
        return jsonify({"error": "Disease or Location missing"}), 400

    specialization, doctors = recommend_doctor(disease, location)
    return jsonify({
        "specialization": specialization,
        "doctors": doctors
    })

# Recommendation Page Renderer
@app.route('/recommendation')
def recommendation_page():
    disease = request.args.get('disease', '')
    return render_template('recommendation.html', disease=disease)

@app.route("/nearhosp")
def nearhosp():
    return render_template("nearhosp.html")

@app.route('/insurances')
def insurances():
    return render_template('insurances.html')


# Load the dataset once at startup
try:
    df = pd.read_csv("BMI_Diet_Recommendations_Corrected.csv")
except Exception as e:
    print(f"Error loading CSV file: {e}")
    df = pd.DataFrame()  # Fallback if the file fails to load

def calculate_bmi(height, weight):
    try:
        return round(weight / (height ** 2), 2)
    except ZeroDivisionError:
        return None

def determine_bmi_category(bmi):
    if bmi is None:
        return "Invalid"
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 24.9:
        return "Normal weight"
    elif 25 <= bmi < 29.9:
        return "Overweight"
    else:
        return "Obesity"

def format_recommendations(row):
    """
    Format recommendations in a structured format for JSON response.
    """
    row = row.fillna('N/A')  # Fill missing values with 'N/A'
    diet_plan = row['Example Diet Plan']
    meals = diet_plan.split('; ')

    return {
        "Category": row['Category'],
        "Health Implications": row['Health Implications'],
        "Diet Tips": row['Diet Tips'],
        "Examples of Foods": row['Examples of Foods'],
        "Exercise Routine": row['Exercise Routine'],
        "Lifestyle Tips": row['Lifestyle Tips'],
        "Snack Ideas": row['Snack Ideas'],
        "Hydration Tips": row['Hydration Tips'],
        "Supplements": row['Supplements'],
        "Cooking Tips": row['Cooking Tips'],
        "Daily Calorie Range": row['Daily Calorie Range'],
        "Example Diet Plan": meals
    }

@app.route("/bmi", methods=["GET", "POST"])
def bmi():
    if request.method == "GET":
        return render_template("bmi.html")  # Render the HTML page

    if request.method == "POST":
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        height = data.get("height")
        weight = data.get("weight")

        if not isinstance(height, (int, float)) or not isinstance(weight, (int, float)):
            return jsonify({"error": "Height and weight must be numbers"}), 400

        bmi_value = calculate_bmi(height, weight)
        category = determine_bmi_category(bmi_value)
        row = df[df['Category'] == category].iloc[0]
        recommendations = format_recommendations(row)

        # Return all data from format_recommendations
        return jsonify({
            "bmi": bmi_value,
            "category": category,
            "recommendations": recommendations
        })



@app.route("/generate-pdf", methods=["POST"])
def generate_pdf():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    # Extract data
    bmi = data.get("bmi", "N/A")
    category = data.get("category", "N/A")
    recommendations = data.get("recommendations", {})

    # Render HTML template for PDF
    rendered_html = render_template(
        "pdf_template.html", 
        bmi=bmi, 
        category=category, 
        recommendations=recommendations
    )

    # Generate PDF
    pdf_output = io.BytesIO()
    pisa_status = pisa.CreatePDF(io.StringIO(rendered_html), dest=pdf_output)

    if pisa_status.err:
        return jsonify({"error": "Failed to generate PDF"}), 500

    pdf_output.seek(0)
    return send_file(pdf_output, download_name="BMI_Report.pdf", as_attachment=True)
# Flask App Runner
if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)  # use_reloader=False prevents double execution on Windows
