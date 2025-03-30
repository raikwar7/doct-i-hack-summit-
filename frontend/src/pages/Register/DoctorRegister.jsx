import React, { useState } from "react";
import InputContainer from "../../components/InputContainer/InputContainer";
import Loading from "../../components/Loading";
import Btn from "../../components/Btn";
import toast from "react-hot-toast";
import axios from "axios";
import validateEmail from "../../../utils/validateEmail";
import Option from "../../components/Option";

const DoctorRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [age, setAge] = useState(null);
  const [experience, setExperience] = useState(null);
  const [qualification, setQualification] = useState("");
  const [licence, setLicence] = useState("");
  const [fee, setFee] = useState(null);
  const [password, setPassword] = useState("");
  const [specilization, setSpecilization] = useState("");
  const [location, setLocation] = useState("");
  

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
      label: "Experience of Years",
      id: "experience",
      placeholder: "Enter Your Experience",
      inputType: "Number",
      onchange: (event) => {
        setExperience(event.target.value);
      },
    },
    {
      label: "Qualification",
      id: "qualification",
      placeholder: "Enter Your Qualification",
      inputType: "text",
      onchange: (event) => {
        setQualification(event.target.value);
      },
    },
    {
      label: "Licence Number",
      id: "licence",
      placeholder: "Enter Licence Number",
      inputType: "text",
      onchange: (event) => {
        setLicence(event.target.value);
      },
    },
    {
      label: "Fee",
      id: "fee",
      placeholder: "Enter Fee",
      inputType: "number",
      onchange: (event) => {
        setFee(event.target.value);
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
    // {
    //   label: "Specilization",
    //   id: "specilization",
    //   placeholder: "Enter Specilization",
    //   inputType: "text",
    //   onchange: (event) => {
    //     setSpecilization(event.target.value);
    //   },
    // },
    // {
    //   label: "City",
    //   id: "location",
    //   placeholder: "Enter City Location",
    //   inputType: "text",
    //   onchange: (event) => {
    //     setLocation(event.target.value);
    //   },
    // },
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
          experience == null ||
          qualification == "" ||
          licence == "" ||
          fee == null ||
          password == "" ||
          specilization == "",
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
        const ageInt = parseInt(age);
        const experienceInt = parseInt(experience)
        const feeInt = parseInt(fee)
        
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/v1/user/doctorRegister`,
          {
            name,
            gmail,
            phone: phoneInt,
            age: ageInt,
            experience: experienceInt,
            qualification,
            licence,
            fee: feeInt,
            password,
            specilization,
            location
          },
          { withCredentials: true },
          config
        );
        if (data.msg == "Doctor Registered") {
          toast.success("Doctor Registered Successfully!");
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

  const specilizationArr = [
    {
      val: "",
      name: "Choose Specilization",
    },
    {
      val: "Dermatology",
      name: "Dermatology",
    },
    {
      val: "Neurology",
      name: "Neurology",
    },
    {
      val: "Gastroenterology",
      name: "Gastroenterology",
    },
    {
      val: "Immunology",
      name: "Immunology",
    },
    {
      val: "Pulmonology",
      name: "Pulmonology",
    },
    {
      val: "Orthopedics",
      name: "Orthopedics",
    },
    {
      val: "Endocrinology",
      name: "Endocrinology",
    },
    {
      val: "Hepatology",
      name: "Hepatology",
    },
    {
      val: "Infectious Disease",
      name: "Infectious Disease",
    },
    {
      val: "Urology",
      name: "Urology",
    },
    {
      val: "Cardiology",
      name: "Cardiology",
    },
    {
      val: "General Medicine",
      name: "General Medicine",
    },
    {
      val: "Rheumatology",
      name: "Rheumatology",
    },
    {
      val: "Toxicology",
      name: "Toxicology",
    },
    {
      val: "Vascular Surgery",
      name: "Vascular Surgery",
    },
  ];
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

  const credientialsData=[
    
    {
      label: "Location",
      sele: "location",
      opt: [...locationArr],
    },
    {
      label: "Specilization",
      sele: "specilization",
      opt: [...specilizationArr],
    },
  ]
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
        <img
          alt="Your Company"
          src="doctor.png"
          // src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Doctor Registration
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {noInput.map((ele, idx) => {
            return <InputContainer key={idx} detail={ele} />;
          })}
          {credientialsData.map((ele, idx) => {
              return <Option key={idx} opt={ele}  setLocation={setLocation} setSpecilization={setSpecilization}/>;
            })}
          {/* {data.map((ele, idx) => {
            return <Option key={idx} opt={ele} />;
          })} */}
          {isLoading ? <Loading /> : <Btn btninfo={btninfo} />}
        </form>
      </div>
    </>
  );
};

export default DoctorRegister;
