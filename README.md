
# 🚀Doct-i: AI-Powered Healthcare Assistant
## "Where Health and Convenience Are at Your Fingertips."

### 🎯 Overview
Doct-i is an AI-powered healthcare platform designed to revolutionize early diagnosis and personalized care by providing:

✅ AI-driven disease prediction with probability scores
✅ Skin disease recognition using image analysis
✅ AI chatbot for symptom assessment
✅ Doctor recommendations based on specialty & location
✅ Seamless appointment booking system
✅ Doctor management & verification system
✅ Emergency hospital locator (future feature)

### 📌 Problem Statement
Millions of patients in India and globally struggle with:

🔴 Delayed Diagnoses – Misdiagnosis and lack of early detection cause complications.
🔴 Limited Access to Specialists – Rural areas lack specialized doctors.
🔴 Inefficient Appointment Systems – Manual bookings cause delays.
🔴 Overcrowded Hospitals – Long queues even for minor issues.

### 🌟 Our Solution
🏥 For Patients
🔹 AI Disease Prediction – Predict top 7 diseases with descriptions & precautions.
🔹 Skin Disease Recognition – Upload a photo for instant AI-based diagnosis.
🔹 AI Chatbot – Enter symptoms and get an AI-driven health assessment.
🔹 Doctor Recommendation – Get matched with specialists based on predicted disease.
🔹 Easy Doctor Booking – View doctor availability and book instantly.
🔹 Emergency Assistance – Locate nearby hospitals (future feature).

👨‍⚕️ For Doctors
🔹 Doctor Profile Management – Verified doctors can list & manage profiles.
🔹 Doctor Chatbot – Stay updated with the latest research & guidelines.
🔹 Appointment Management – View, approve, or reschedule patient bookings.

🛠️ For Admin
🔹 Doctor Verification System – Validate doctors using license numbers.
🔹 End-to-End Monitoring – Oversee all patient-doctor interactions.

🔥 Competitive Advantage
✔️ AI-Driven Disease Prediction – More accurate than simple symptom checkers.
✔️ Doctor Matching Algorithm – Reduces trial-and-error visits.
✔️ Seamless Appointment Booking – Reduces wait times.
✔️ Verified Doctor Profiles – Ensures trust & credibility.

💰 Revenue Model
💡 Freemium Model – Free basic features, paid premium services.

💳 Subscription Model (B2C & B2B)

Patients: Monthly/yearly plans for AI consultations, priority bookings.

Doctors: Subscription for AI insights & profile listing.

📊 Commission-Based – Earn from doctor bookings & pharmacy/lab referrals.
🛠️ API as a Service – Offer AI-powered diagnosis APIs to hospitals.
🎯 Advertising & Sponsorships – Healthcare brands can display targeted ads.

📂 Project Structure
plaintext
Copy
Edit
Doct-i/
│── ai-models/         # AI models for disease prediction & doctor recommendation
│── backend/           # Node.js backend for API & authentication
│── frontend/          # React-based frontend for UI
│── README.md          # Project documentation
AI Models (FastAPI + Machine Learning)
✔ Disease Prediction
✔ Skin Disease Detection
✔ Doctor Recommendation

🚀 How to Run the Project
📌 1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-repo/Doct-i.git
cd Doct-i
📌 2. Setup AI Models (FastAPI)
bash
Copy
Edit
cd ai-models
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
📌 3. Setup Backend (Node.js)
bash
Copy
Edit
cd backend
npm install
npm start
📌 4. Setup Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm start
🔹 Open http://localhost:3000 in your browser.

🎯 Future Enhancements
🔹 Fitness Coach AI – Personalized health & wellness recommendations
🔹 Insurance Integration – Seamless claim processing & coverage access
🔹 Government Health Resources – Direct links to WHO, AIIMS, etc.
🔹 Hospital Finder – OpenStreetMap API integration for locating nearby hospitals

📧 Contact Us
📞 Divyansh Singh Raikwar (Team Lead) – 7068980207
📩 Email: theraikwar7@gmail.com

🚀 Let's make healthcare smarter, faster, and more accessible with Doct-i! 💙
=======

# 🩺 Disease Prediction & Doctor Recommendation Web App

This web application predicts the **top 7 possible diseases** based on a combination of user-provided symptoms using a **Random Forest model**. The app also provides:

✅ Detailed **disease descriptions**\
✅ Suggested **precautions** to follow\
✅ Recommended **doctors** based on location, ratings, and experience using a **weighted scoring model**.

---

## 🚀 Features

✅ **Predict Top 7 Diseases**: Enter symptoms, and the app predicts the most likely diseases with their probabilities.\
✅ **Disease Description & Precautions**: Displays important information about predicted diseases.\
✅ **Doctor Recommendation System**: Based on user-selected disease and location, the app suggests top-rated doctors using a **weighted average model** that considers **ratings** and **experience** (further scaled and normalized for accuracy).\
✅ **User-Friendly Interface** for seamless navigation and interaction.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (for UI design)
- **Backend:** Flask (Python)
- **Machine Learning Model:** Random Forest Classifier (for disease prediction)
- **Doctor Recommendation Model:** Weighted Average Model with scaling and normalization
- **Database:** CSV/JSON data for disease details and doctor information

---

## 📋 Installation Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/raikwar7/virtualdoc2.git
```

2. **Navigate to the project folder:**

```bash
cd virtualdoc2
```

3. **Create and activate a virtual environment:**

```bash
python -m venv venv
source venv/bin/activate   # For Mac/Linux
venv\Scripts\activate      # For Windows
```

4. **Install dependencies:**

```bash
pip install -r requirements.txt
```

5. **Run the Flask app:**

```bash
python app.py
```

6. **Open your browser** and visit:\
   👉 `http://localhost:5000`

---

## 📂 Project Structure

```
├── dataset
│   ├── datasetdoc.csv           # Dataset for disease prediction
│   ├── symptom_precaution.csv    # Dataset for disease precautions
│   ├── symptom_Description.csv   # Dataset for disease descriptions
│
├── model
│   ├── disease_model.pkl         # Trained Random Forest model
│   ├── doctor_model.pkl          # Doctor recommendation model
│
├── templates
│   ├── index.html                # Home page (Symptoms input)
│   ├── result.html               # Display predicted diseases
│   ├── recommend.html            # Display recommended doctors
│
├── app.py                        # Main Flask application logic
├── requirements.txt              # Required dependencies
├── README.md                     # Project documentation
```

---

## ⚙️ How It Works

1. **Disease Prediction Flow:**

   - Users enter their symptoms in the provided input fields.
   - The **Random Forest model** predicts the **top 7 possible diseases** with their probabilities.
   - The app retrieves relevant **descriptions** and **precautions** from the dataset.

2. **Doctor Recommendation Flow:**

   - Users can choose to find doctors for their predicted disease.
   - Users provide their **preferred location** as input.
   - The system uses a **weighted average model** that prioritizes:
     - **Doctor Ratings** (80%)
     - **Years of Experience** (20%)
   - The scores are **scaled** and **normalized** to ensure fair ranking.

---

## 📧 Contact

For queries or improvements, please contact:

- **Name:** Divyansh Raikwar
- **Email:** theraikwar7@gmail.com
- **GitHub:** [github.com/raikwar7](https://github.com/raikwar7)

---

✅ **Feel free to contribute by raising issues or submitting pull requests.**\
🔥 Happy Coding!

=======
# virtualdoc2
A disease Predictor and Doctor Recommender Web-App
>>>>>>> e4e01d6 (Initial commit)
>>>>>>> 1d854ac (reqtxt)
