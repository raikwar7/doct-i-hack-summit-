import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";

const isLoggedIn = async (req, res) => {
  try {
    const token = await req.body.token;
    // const token = await req.cookies.jwt;

    if (!token) {
      return res.status(201).json({
        msg: "Unauthorized - No Token Provided",
      });
    }

    const { userId } = await jwt.verify(token, process.env.JWT_TOKEN);
    if (!userId) {
      return res.status(201).json({
        msg: "Unauthorized - No Token Provided",
      });
    }

    const userDoctor = await Doctor.findOne({
      _id: userId,
    });
    const userPatient = await Patient.findOne({
      _id: userId,
    });

    if (!userDoctor && !userPatient) {
      return res.status(201).json({
        msg: "Unauthorized - No Token Provided",
      });
    }

    if (userDoctor) {
      return res.status(200).json({
        msg: "userDoctor getted",
        id: userId
      });
    }

    res.status(200).json({
      msg: "userPatient getted",
      id: userId
    });
  } catch (error) {
    console.log("Error occure in the isLoggedIn.js ====> " + error.message);
  }
};

export default isLoggedIn;
