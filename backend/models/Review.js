import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",               // Reference to Doctor model
      required: true,
    },
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",                 // Reference to Patient model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0                    // Rating should be between 1 and 5
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,               // Automatically add createdAt and updatedAt
  }
);

const Review = new mongoose.model("Review", reviewSchema);

export default Review
