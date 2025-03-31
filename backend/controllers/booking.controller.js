import mongoose from "mongoose";
import Booking from "../models/Booking.model.js";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import bookingAuth from "../zod/bookingAuth.js";

const bookingDoctor = async (req, res) => {
  try {
    const { success, error } = bookingAuth.safeParse(req.body);
    if (!success) {
      console.log(error);
      res.status(401).json({
        msg: "Some mistake in your inputs",
      });
      return;
    }
    const { date, slot, doctor_id, patient_id, reportfile } = req.body;

    if (patient_id == doctor_id) {
      res.status(401).json({
        msg: "Doctor Can't Change Slot",
      });
      return;
    }

    const updateFields = { date, slot };
    if (reportfile) {
      updateFields.reportfile = reportfile;
    }

    const isBooking = await Booking.findOneAndUpdate(
      { doctor_id, patient_id },
      { $set: updateFields  },
      { new: true, upsert: true }
    );

    // const isBooking = await Booking.findOneAndUpdate(
    //   {
    //     $and: [{ doctor_id: doctor_id }, { patient_id: patient_id }],
    //   },
    //   { date, slot, reportfile,updatedAt: new Date() },
    //   { new: true, upsert: true }
    // );
    return res.status(201).json({
      msg: "Booked Successfully",
      isBooking,
    });
  } catch (error) {
    console.log(
      "Error occure in the bookingDoctor.controller.js ===> " + error.message
    );
  }
};

const cancelBookingByDoctor = async (req, res) => {
  try {
    const { id, reason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Booking ID" });
    }

    const isBooking = await Booking.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          reason: reason,
          status: "cancelled",
        },
      }
    );

    if (!isBooking) {
      return res.status(404).json({
        msg: "Booking Doesn't Exist",
      });
    }

    return res.status(201).json({
      msg: "Cancel Successfully",
      isBooking,
    });
  } catch (error) {
    console.log(
      "Error occure in the bookingDoctor.controller.js ===> " + error.message
    );
  }
};

const cancelBookingByPatient = async (req, res) => {
  try {
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Booking ID" });
    }

    const isBooking = await Booking.findByIdAndDelete({ _id: id });

    if (!isBooking) {
      return res.status(404).json({
        msg: "Booking Doesn't Exist",
      });
    }

    return res.status(201).json({
      msg: "Cancel Successfully",
      isBooking,
    });
  } catch (error) {
    console.log(
      "Error occure in the bookingDoctor.controller.js ===> " + error.message
    );
  }
};

const getBookingByDoctor = async (req, res) => {
  try {
    const doctorId = await req.body.userId;
    // const doctorId = new mongoose.Types.ObjectId(req.body.userId);
    if (!doctorId) {
      return res.status(400).json({
        msg: "User not Logged In",
      });
    }
    const bookings = await Booking.find({
      doctor_id: doctorId,
      status: { $ne: "cancelled" },
    })
      .populate(["doctor_id", "patient_id"])
      .exec();
    return res.status(200).send(bookings);
  } catch (error) {
    console.log(
      "Error occure in the bookingDoctor.controller.js ===> " + error.message
    );
  }
};

const getBookingByPatient = async (req, res) => {
  try {
    const patientId = await req.body.userId;
    //const patientId = new mongoose.Types.ObjectId(req.body.userId);
    // console.log(patientId)
    if (!patientId) {
      return res.status(400).json({
        msg: "User not Logged In",
      });
    }
    const bookings = await Booking.find({ patient_id: patientId })
      .populate(["doctor_id", "patient_id"])
      .exec();
    return res.status(200).send(bookings);
  } catch (error) {
    console.log(
      "Error occure in the bookingDoctor.controller.js ===> " + error.message
    );
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate(["doctor_id", "patient_id"])
      .exec();
    return res.status(200).send(bookings);
  } catch (error) {
    console.log(
      "Error occure in the bookingDoctor.controller.js ===> " + error.message
    );
  }
};

const patientExamined = async (req, res) => {
  try {
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Booking ID" });
    }

    const isBooking = await Booking.findByIdAndUpdate({ _id: id },{
      $set: {
        status: "completed"
      }
    });

    if (!isBooking) {
      return res.status(404).json({
        msg: "Booking Doesn't Exist",
      });
    }

    return res.status(201).json({
      msg: "Examined Successfully",
      isBooking,
    });
  } catch (error) {
    console.log(
      "Error occure in the bookingDoctor.controller.js ===> " + error.message
    );
  }
};

const shareMeetLink = async (req, res) => {
  const { bookingId, meetLink } = req.body;

  try {
    if (!bookingId || !meetLink) {
      return res.status(400).json({ msg: "Booking ID and Meet link required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      {_id : bookingId},
      { $set: { meetLink } },
      { new: true }
    );

    if (updatedBooking) {
      res.status(200).json({
        msg: "Google Meet link shared successfully",
        booking: updatedBooking,
      });
    } else {
      res.status(404).json({ msg: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

export {
  bookingDoctor,
  getBookingByDoctor,
  getBookingByPatient,
  cancelBookingByDoctor,
  cancelBookingByPatient,
  patientExamined,
  getBookings,
  shareMeetLink
};
