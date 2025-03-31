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

const LoginDoctor = () => {
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
          toast.error("Please fill in both Username and Password");
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/v1/user/doctorLogin`,
          { username, password },
          { withCredentials: true },
          config
        );

        if (data.msg === "Successfully Login") {
          toast.success("Successfully Logged In");
          localStorage.setItem("token", data.jwt);
          setUserId(data.userId);
          setUser(data.user);
          navigate("/");
        } else {
          toast.error(data.msg || "Invalid Credentials");
        }
      } catch (error) {
        toast.error("An error occurred. Try again!");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-blue-700 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl transform hover:scale-105 transition duration-500">
        <div className="flex justify-center">
          <div className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
            <FaUserMd size={50} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-600 mt-6">
          Doctor Login
        </h2>

        <form className="mt-8 space-y-6">
          {noInput.map((ele, idx) => (
            <InputContainer key={idx} detail={ele} />
          ))}
          {isLoading ? <Loading /> : <Btn btninfo={btninfo} />}
        </form>

        <p className="mt-6 text-center text-gray-600">
          Not registered?{" "}
          <Link
            to="/registerDoctor"
            className="text-blue-500 hover:underline font-medium"
          >
            Register as Doctor
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginDoctor;
