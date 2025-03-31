import mongoose from "mongoose";

const dotorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gmail: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    licence: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    specilization: {
      type: String,
      enum: [
        "Dermatology",
        "Neurology",
        "Gastroenterology",
        "Immunology",
        "Pulmonology",
        "Orthopedics",
        "Endocrinology",
        "Hepatology",
        "Infectious Disease",
        "Urology",
        "Cardiology",
        "General Medicine",
        "Rheumatology",
        "Toxicology",
        "Vascular Surgery",
      ],
      required: false,
    },
    location: {
      type: String,
      enum: [
        "Hyderabad",
        "Mumbai",
        "Pune",
        "Bangalore",
        "Kolkata",
        "Jaipur",
        "Chennai",
        "Ahmedabad",
        "Lucknow",
        "Delhi",
      ],
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    avgRating: {
      type: Number,
      required: false,
      min: 0,
      max: 5,
      default: 0,
    },
    totalReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

const Doctor = new mongoose.model("Doctor", dotorSchema);

export default Doctor;
