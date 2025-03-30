
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
