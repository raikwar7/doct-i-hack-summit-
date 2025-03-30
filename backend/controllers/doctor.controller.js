import Doctor from "../models/doctor.model.js";
import genOtp from "../utils/genOtp.js";
import doctorAuth from "../zod/doctorAuth.js";
import signAuth from "../zod/signAuth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const doctorRegister = async (req, res) => {
  try {
    const { success } = doctorAuth.safeParse(req.body);
    console.log(success);
    if (!success) {
      res.status(401).json({
        msg: "Some mistake in your inputs",
      });
      return;
    }

    const {
      name,
      gmail,
      phone,
      age,
      experience,
      qualification,
      licence,
      fee,
      password,
      specilization,
      location,
    } = req.body;

    const verified = await Doctor.findOne({
      gmail,
    });

    if (verified) {
      res.status(201).json({
        msg: "User already exist",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const otp = genOtp();
    console.log(otp);

    console.log({
      name,
      gmail,
      phone,
      age,
      experience,
      qualification,
      licence,
      fee,
      password,
      specilization,
      location,
    });

    await Doctor.create({
      name,
      gmail,
      phone,
      age,
      experience,
      qualification,
      licence,
      fee,
      password: hashPass,
      specilization,
      location,
    });

    res.status(200).json({
      msg: "Doctor Registered",
    });
  } catch (error) {
    console.log(
      "error occur in the doctor.controller.js ===> " + error
    );
    return res.status(400).json({
      msg: "Error on Backend side"
    })
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { success, error } = signAuth.safeParse(req.body);

    if (!success) {
      // console.log(error)
      res.status(201).json({
        msg: "Input are not correct",
      });
      return;
    }

    const isUser = await Doctor.findOne({
      gmail: username,
    });
    if (isUser !== null && isUser.verified) {
      res.status(201).json({
        msg: "Admin don't access you",
      });
      return;
    }
    if (isUser !== null) {
      const checkPassword = await bcrypt.compare(password, isUser.password);
      if (checkPassword) {
        const userId = isUser._id.toString();
        const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
          expiresIn: "15d",
        });

        res.cookie("jwt", token, {
          maxAge: 15 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          // sameSite: 'strict',
          // secure: true,
        });

        return res.status(200).json({
          msg: "Successfully Login",
          jwt: token,
          userId: isUser._id,
          user: "Doctor"
        });
      }
      return res.status(201).json({
        msg: "Password is wrong!",
      });
    }
    res.status(201).json({
      msg: "You are not Registered!",
    });
  } catch (error) {
    console.log(
      "Error occure in the doctor.controller.js ===> " + error.message
    );
  }
};

const searchDoctor = async (req, res) => {
  try {
    const { doctor_id, location, specilization } = req.body;
    // if (doctor_id !== "") {
    //   const doctorsList = await Doctor.find({ licence: { $eq: doctor_id } });
    //   return res.status(200).send(doctorsList);
    // }

    const doctorsList = await Doctor.find({
      $or: [
        {
          $and: [
            {
              location: { $eq: location },
              specilization: { $eq: specilization },
            },
          ],
        },
        { licence: { $eq: doctor_id } }
      ],
    }).select("-password");
    // const doctorsList = await Doctor.find({ location: { $eq: location }, specilization: {$eq: specilization} });
    return res.status(200).send(doctorsList);
  } catch (error) {
    console.log(
      "Error occure in the searchDoctor.controller.js ===> " + error.message
    );
  }
};

export { doctorRegister, doctorLogin, searchDoctor };
