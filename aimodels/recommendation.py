import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from pymongo import MongoClient

# MongoDB Atlas connection
client = MongoClient("mongodb+srv://docai77:docai77@cluster1.it3u8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
db = client["doctdatabase"]
doctors_collection = db["docaisamp"]

# Load disease-to-specialization mapping
disease_df = pd.read_csv("dataset/updated_disease_to_specialization.csv")
disease_to_speciality = dict(zip(disease_df['Disease'], disease_df['Specialization']))

def predict_speciality(disease_name):
    return disease_to_speciality.get(disease_name, "Specialist not found")

def recommend_doctor(disease_name, user_location, top_n=5):
    predicted_specialty = predict_speciality(disease_name)

    # Fetch real-time doctor data from MongoDB Atlas
    doctors_cursor = doctors_collection.find({
        "specialization": {"$regex": f"^{predicted_specialty}$", "$options": "i"},
        "location": {"$regex": f"^{user_location}$", "$options": "i"},
        "number_of_ratings": {"$gte": 50},  # rating threshold
        "status": "Approved"  # Only approved doctors
    })

    doctors = list(doctors_cursor)
    if not doctors:
        return predicted_specialty, []

    # Convert MongoDB cursor data to DataFrame
    data = pd.DataFrame(doctors)

    # Compute weighted average (Bayesian average)
    r = data["ratings"]
    v = data["number_of_ratings"]
    c = r.mean()
    m = v.quantile(0.70)
    data["weighted_avg"] = ((r * v) + (c * m)) / (v + m)

    # Normalize weighted_avg and experience
    scaler = MinMaxScaler()
    data_scaled = scaler.fit_transform(data[["weighted_avg", "experience_years"]])
    data[["norm_weight_avg", "norm_experience"]] = data_scaled

    # Final score calculation
    data["score"] = (data["norm_weight_avg"] * 0.8) + (data["norm_experience"] * 0.2)

    # Sort and select top N doctors
    top_doctors = data.sort_values(by="score", ascending=False).head(top_n)

    return predicted_specialty, top_doctors[[
        "doctor_id", "name", "specialization", "location",
        "slot_timing", "consultancy_fee", "ratings", "number_of_ratings", "score","Phone No","Mail ID"
    ]].to_dict(orient="records")


# Example Usage
if __name__ == "__main__":
    disease = "Common Cold"
    location = "Lucknow"
    specialization, recommended_doctors = recommend_doctor(disease, location)

    print(f"Predicted Specialty: {specialization}")
    print("\nRecommended Doctors:")
    for doc in recommended_doctors:
        print(doc)
