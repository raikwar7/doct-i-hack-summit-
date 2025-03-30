import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  reason: {
    type: String,
    required: false,
    default: ""
  },
  reportfile: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
},{
  timestamps: true,               // Automatically add createdAt and updatedAt
});

const Booking = new mongoose.model("Booking", BookingSchema);

export default Booking;
