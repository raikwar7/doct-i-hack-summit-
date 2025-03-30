import React, { useState } from "react";
import Loading from "../../components/Loading";
import InputContainer from "../../components/InputContainer/InputContainer";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../../components/Btn";
import axios from "axios";
import toast from "react-hot-toast";
import Sign from "../../components/Sign/Sign";
import { useRecoilState } from "recoil";
import Atoms from "../../Recoils/Atoms";

const LoginDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useRecoilState(Atoms.userId)
  const [user, setUser] = useRecoilState(Atoms.userRecoil)

  const noInput = [
    {
      label: "Username",
      id: "username",
      placeholder: "gaurav@gmail.com",
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
      Icon: "",
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
        if (username == "" || password == "") {
          toast.error("Please Fill Up Username and Password");
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/v1/user/doctorLogin`,
          {
            username,
            password,
          },
          { withCredentials: true },
          config
        );

        if (data.msg == "Successfully Login") {
          toast.success("Successfully Login");
          // setIsLoggedIn(true);
          localStorage.setItem("token", data.jwt);
          setUserId(data.userId)
          setUser(data.user)
          // console.log(data.jwt)
          // localStorage.setItem("isLoggedIn", {
          //     value: true,
          //     expiry: now.getTime() + 15  * 24 * 60 * 60
          // });
          navigate("/");
        } else if (data.msg == "Input are not correct") {
          toast.error("Input are not correct");
        } else if (data.msg == "Admin don't access you") {
          toast.error("Admin don't access you");
        } else if (data.msg == "You are not Registered!") {
          toast.error("You are not Registered!");
        } else if (data.msg == "Password is wrong!") {
          toast.error("Password is wrong!");
        } else {
          toast.error("Fill Up Again");
        }
      } catch (error) {
        toast.error("Try Again Some Issue Occur");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* <Sign/> */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="doctor.png"
          // src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {noInput.map((ele, idx) => {
            return <InputContainer key={idx} detail={ele} />;
          })}
          {/* <Link to={"/forgetpass"} className="text-blue-600 underline my-3 block">Forget Password!</Link> */}
          {isLoading ? <Loading /> : <Btn btninfo={btninfo} />}
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/registerDoctor"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register as Doctor
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginDoctor;
