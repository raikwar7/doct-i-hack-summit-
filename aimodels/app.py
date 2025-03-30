from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS
from recommendation import recommend_doctor  # MongoDB-based recommendation logic

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend JS

# Load Disease Prediction Model
with open("models/disease_model (1).pkl", "rb") as file:
    disease_model, le, unique_symp = pickle.load(file)

# Load Disease to Specialization Mapping
df = pd.read_csv("dataset/updated_disease_to_specialization.csv")
disease_to_speciality = dict(zip(df['Disease'], df['Specialization']))

# Load Description and Precaution Data
dataf1 = pd.read_csv("dataset/symptom_Description.csv")
datap = pd.read_csv("dataset/symptom_precaution (3).csv")
dataf1.columns = dataf1.columns.str.strip()
datap.columns = datap.columns.str.strip()

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
    result = dataf1[dataf1["Disease"].str.lower() == disease_name.lower()]
    if not result.empty:
        description = result.iloc[0].get("Description", "No description available")
        precautions = datap[datap["Disease"].str.lower() == disease_name.lower()].iloc[:, 1:].values.flatten().tolist()
        precautions = [p for p in precautions if isinstance(p, str)]
        return description, precautions if precautions else ["No Precautions Available"]
    return "No description available", ["No Precautions Available"]

# Home Route
@app.route("/")
def home():
    return render_template("index.html", symptoms=unique_symp)

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
    # Static unique locations as you shared
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


# Flask App Runner
if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)  # use_reloader=False prevents double execution on Windows
