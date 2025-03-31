import React, { useState } from "react";
import InputContainer from "../../components/InputContainer/InputContainer";
import Loading from "../../components/Loading";
import Btn from "../../components/Btn";
import Option from "../../components/Option";
import toast from "react-hot-toast";
import validateEmail from "../../../utils/validateEmail";
import axios from "axios";

const DoctorRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [age, setAge] = useState(null);
  const [disease, setDisease] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [location, setLocation] = useState("");


  const locationArr = [
    {
      val: "",
      name: "Select Location (City)",
    },
    {
      val: "Hyderabad",
      name: "Hyderabad",
    },
    {
      val: "Mumbai",
      name: "Mumbai",
    },
    {
      val: "Pune",
      name: "Pune",
    },
    {
      val: "Bangalore",
      name: "Bangalore",
    },
    {
      val: "Kolkata",
      name: "Kolkata",
    },
    {
      val: "Jaipur",
      name: "Jaipur",
    },
    {
      val: "Chennai",
      name: "Chennai",
    },
    {
      val: "Ahmedabad",
      name: "Ahmedabad",
    },
    {
      val: "Lucknow",
      name: "Lucknow",
    },
    {
      val: "Delhi",
      name: "Delhi",
    },
  ];

  const noInput = [
    {
      label: "Name",
      id: "name",
      placeholder: "Enter Your Name",
      inputType: "text",
      onchange: (event) => {
        setName(event.target.value);
      },
    },
    {
      label: "G-mail",
      id: "gmail",
      placeholder: "Enter G-mail",
      inputType: "email",
      onchange: (event) => {
        setGmail(event.target.value);
      },
    },
    {
      label: "Phone Number",
      id: "phone",
      placeholder: "Enter Phone Number",
      inputType: "Number",
      onchange: (event) => {
        setPhone(event.target.value);
      },
    },
    {
      label: "Age",
      id: "age",
      placeholder: "Enter Your Age",
      inputType: "Number",
      onchange: (event) => {
        setAge(event.target.value);
      },
    },
    {
      label: "Any Previous Disease",
      id: "disease",
      placeholder: "Previous Disease",
      inputType: "text",
      onchange: (event) => {
        setDisease(event.target.value);
      },
    },
    {
      label: "Password",
      id: "password",
      placeholder: "Enter Password",
      inputType: "password",
      onchange: (event) => {
        setPassword(event.target.value);
      },
    },
  ];

  const btninfo = {
    label: "Register",
    onclick: async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        if (
          name == "" ||
          gmail == "" ||
          phone == null ||
          age == null ||
          disease == "" ||
          password == "" ||
          gender == "" || 
          location == ""
        ) {
          toast.error("Please Fill Up Important Details");
          return;
        }
        if (!validateEmail(gmail)) {
          toast.error("Write Valid Gmail");
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const phoneInt = parseInt(phone);
        const ageInt = parseInt(age)
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/v1/user/patientRegister`,
          {
            name,
            gmail,
            phone: phoneInt,
            age: ageInt,
            disease,
            password,
            gender,
            location
          },
          { withCredentials: true },
          config
        );
        if (data.msg == "Patient Registered") {
          toast.success("Patient Registered Successfully!");
          // navigate("/register/verify", {
          //   state: { data: { name, semester, branch, gmail } },
          // });
        } else if (data.msg == "User already exist") {
          toast.success("User already exist");
        } else {
          toast.error("Some error fill query form");
        }
      } catch (error) {
        toast.error("Error on Backend Side");
      } finally {
        setIsLoading(false);
      }
    },
  };

  const data = [
    {
      label: "Gender",
      sele: "gender",
      opt: [
        {
          val: "male",
          name: "Male",
        },
        {
          val: "female",
          name: "Female",
        },
        {
          val: "other",
          name: "Other",
        },
      ],
    },
    {
      label: "Location",
      sele: "location",
      opt: [...locationArr],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-blue-700 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl max-w-lg w-full p-8 transition-transform duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="user-profile.png"
          // src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Register as User
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {noInput.map((ele, idx) => {
            return <InputContainer key={idx} detail={ele} />;
          })}
          {data.map((ele, idx) => {
            return <Option key={idx} opt={ele}  setGender={setGender} setLocation={setLocation} />;
          })}
          {isLoading ? <Loading /> : <Btn btninfo={btninfo} />}
        </form>
      </div>
      </div>
    </div>
  );
};

export default DoctorRegister;
