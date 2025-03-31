import React, { useState } from "react";
import Loading from "../../components/Loading";
import InputContainer from "../../components/InputContainer/InputContainer";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../../components/Btn";
import toast from "react-hot-toast";
import axios from "axios";
import { useRecoilState } from "recoil";
import Atoms from "../../Recoils/Atoms";
import { FaUserMd } from "react-icons/fa";

const LoginPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useRecoilState(Atoms.userId);
  const [user, setUser] = useRecoilState(Atoms.userRecoil);

  const noInput = [
    {
      label: "Username",
      id: "username",
      placeholder: "doctor@gmail.com",
      inputType: "text",
      onchange: (event) => {
        setUsername(event.target.value);
      },
    },
    {
      label: "Password",
      id: "password",
      placeholder: "*********",
      inputType: "password",
      onchange: (event) => {
        setPassword(event.target.value);
      },
    },
  ];

  const btninfo = {
    label: "Sign In",
    onclick: async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);

        if (username === "" || password === "") {
          toast.error("Please fill in both fields.");
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/v1/user/patientLogin`,
          { username, password },
          { withCredentials: true },
          config
        );

        if (data.msg === "Successfully Login") {
          toast.success("Logged in successfully!");
          localStorage.setItem("token", data.jwt);
          setUserId(data.userId);
          setUser(data.user);
          navigate("/");
        } else if (data.msg === "Input are not correct") {
          toast.error("Invalid Credentials.");
        } else if (data.msg === "You are not Registered!") {
          toast.error("User not registered.");
        } else if (data.msg === "Password is wrong!") {
          toast.error("Incorrect password.");
        } else {
          toast.error("Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl max-w-lg w-full p-8 transition-transform duration-300 hover:scale-105">
        {/* Doctor Icon */}
        <div className="flex justify-center">
          <div className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
            <FaUserMd size={50} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-600 mt-6">
          Patient Login
        </h2>

        {/* Form */}
        <form className="space-y-6 mt-8">
          {noInput.map((ele, idx) => (
            <InputContainer key={idx} detail={ele} />
          ))}

          {isLoading ? (
            <Loading />
          ) : (
            <Btn
              btninfo={btninfo}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300"
            />
          )}
        </form>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Not a member?{" "}
            <Link
              to="/registerPatient"
              className="text-blue-500 font-medium hover:underline"
            >
              Register as Patient
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPatient;
