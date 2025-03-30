import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Atoms from "../../Recoils/Atoms";
import NavBtn from "./NavBtn";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [userId, setUserId] = useRecoilState(Atoms.userId);
  const [user, setUser] = useRecoilState(Atoms.userRecoil);
  const setAppointments = useSetRecoilState(Atoms.appointments);
  const setBooking = useSetRecoilState(Atoms.booking);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(Atoms.isLoginIn);
  const navigate = useNavigate();

  const data = [
    {
      label: "Doctor Register",
      to: "/registerDoctor",
      dis: `${isLoggedIn ? "hidden" : "block"}`,
    },
    {
      label: "Doctor Login",
      to: "/loginDoctor",
      dis: `${isLoggedIn ? "hidden" : "block"}`,
    },
    {
      label: "Patient Register",
      to: "/registerPatient",
      dis: `${isLoggedIn ? "hidden" : "block"}`,
    },
    {
      label: "Patient Login",
      to: "/loginPatient",
      dis: `${isLoggedIn ? "hidden" : "block"}`,
      // col: "bg-[#008080]"
    },
    {
      label: "Search Doctors",
      to: "/searchDoctors",
      // dis: `${isLoggedIn ? "hidden" : "block"}`,
      // col: "bg-[#008080]"
    },
    {
      label: "Logout",
      to: "",
      col: "bg-[#FF5733]",
      dis: `${isLoggedIn ? "block" : "hidden"}`,
      onclick: async () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserId("");
        setAppointments([]);
        setBooking([]);
        await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/api/v1/user/logout`,
          { withCredentials: true }
        );
        {
          user == "Patient"
            ? navigate("/loginPatient")
            : navigate("/loginDoctor");
        }
        setUser("");
      },
    },
  ];

  return (
    <div className="flex w-full gap-3 ">
      {data.map((ele, idx) => {
        return <NavBtn list={ele} key={idx} />;
      })}
    </div>
  );
};

export default Navbar;
