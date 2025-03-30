import React from "react";
import DoctorRegister from "./Register/DoctorRegister";
import Sign from "../components/Sign/Sign";
import Mybooking from "../components/Mybooking/Mybooking";
import Bookings from "../components/Mybooking/Bookings";
import { useRecoilValue } from "recoil";
import { userRecoil } from "../Recoils/Atoms";
import Dashboard from "./Dashboard/Dashboard";

const Home = () => {
  // const user = useRecoilValue(userRecoil)
  return (
    <div className="text-lg">
      Home
      <Dashboard/>
      {/* <DoctorRegister/> */}
      {/* <Sign/> */}
      {/* {user=="Patient"? <Mybooking/>: <Bookings/>} */}
      
      {/* <Mybooking/>
      <Bookings/> */}
      {/* <List/> */}
    </div>
  );
};

export default Home;
