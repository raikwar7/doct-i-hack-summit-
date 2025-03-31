import React, { useEffect, useState } from "react";
import List from './List'
import Bookings from "../../components/Mybooking/Bookings";
import Mybooking from "../../components/Mybooking/Mybooking";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Atoms from "../../Recoils/Atoms";
import axios from "axios";
import toast from "react-hot-toast";

import { FaCheckCircle, FaTimesCircle, FaUserMd, FaSpinner } from "react-icons/fa";
// import List from "../../components/Mybooking/List";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const userId = useRecoilValue(Atoms.userId);
  const [booking, setBooking] = useRecoilState(Atoms.allBooking);
  const [activeTab, setActiveTab] = useState("verified");
  const [verifiedDoctors, setVerifiedDoctors] = useState([]);
  const [notVerifiedDoctors, setNotVerifiedDoctors] = useState([]);

  const navigate = useNavigate();

  // const verifiedDoctors = booking.filter(
  //   (doctor) => doctor?.doctor_id?.isVerify ?? false
  // );
  
  // const notVerifiedDoctors = booking.filter(
  //   (doctor) => !doctor?.doctor_id?.isVerify ?? false
  // );
  // console.log(Array.isArray(notVerifiedDoctors))

  console.log("verifiedDoctors");
  console.log(verifiedDoctors);
  console.log("not verifiedDoctors");
  console.log(notVerifiedDoctors);
  const getBookings = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (userId == "") {
        console.log("user not logged in");
        return;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/v1/booking/getBookings`,
        { withCredentials: true },
        config
      );

      // return data;

      if (data && data.length > 0) {
        const verified = data.filter(
          (doctor) => doctor?.doctor_id?.isVerify ?? false
        );
  
        const notVerified = data.filter(
          (doctor) => !(doctor?.doctor_id?.isVerify ?? false)
        );
  
        setVerifiedDoctors(verified);
        setNotVerifiedDoctors(notVerified);
        console.dir(data);
      } else {
        console.log("Not Booking");
      }
    } catch (error) {
      toast.error("Error on Backend Side");
    } finally {
      setLoading(false);
    }
  };

  const getDoctors = async ()=>{
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (userId == "") {
        console.log("user not logged in");
        return;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/v1/user/getDoctors`,
        { withCredentials: true },
        config
      );

      // return data;

      if (data && data.length > 0) {
        const verified = data.filter(
          (doctor) => doctor?.isVerify ?? false
        );
  
        const notVerified = data.filter(
          (doctor) => !(doctor?.isVerify ?? false)
        );
  
        setVerifiedDoctors(verified);
        setNotVerifiedDoctors(notVerified);
        console.dir(data);
      } else {
        console.log("Not Booking");
      }
    } catch (error) {
      toast.error("Error on Backend Side");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (booking.length === 0) {
      getDoctors();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          Admin Panel
        </h1>
        {/* <div className="flex border-b">
        <button
          className={`p-4 ${
            activeTab === "verified"
              ? "border-b-4 border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab("verified")}
        >
          Verified Doctors
        </button>
        <button
          className={`p-4 ${
            activeTab === "notVerified"
              ? "border-b-4 border-red-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab("notVerified")}
        >
          Not Verified Doctors
        </button>
      </div> */}
      {/* Tabs */}
      <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-3 mx-2 rounded-lg text-lg font-semibold transition ${
              activeTab === "verified"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("verified")}
          >
            <FaCheckCircle className="inline mr-2" /> Verified Doctors
          </button>

          <button
            className={`px-6 py-3 mx-2 rounded-lg text-lg font-semibold transition ${
              activeTab === "notVerified"
                ? "bg-red-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-red-100"
            }`}
            onClick={() => setActiveTab("notVerified")}
          >
            <FaTimesCircle className="inline mr-2" /> Not Verified Doctors
          </button>
        </div>
      {loading ? (
        <p className="text-center my-8">Loading...</p>
      ) : (
        <div>
          {activeTab === "verified" ? (
            <div>
              {verifiedDoctors.length > 0 ? (
                <div>
                  {verifiedDoctors.map((ele, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex justify-center cursor-pointer p-4 "
                      >
                        <List showApproveButton={false} doctor={ele} />
                        {/* <p>
                        {ele?.doctor_id?.name} at {ele?.slot}
                      </p>
      
                      <button className="bg-red-500">Cancel</button> */}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No verified doctors available.</p>
              )}
            </div>
          ) : (
            <div>
              {notVerifiedDoctors.length > 0 ? (
                <div>
                  {notVerifiedDoctors.map((ele, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex justify-center cursor-pointer p-4 "
                      >
                        <List showApproveButton={true}  setVerifiedDoctors={setVerifiedDoctors} setNotVerifiedDoctors={setNotVerifiedDoctors} verifiedDoctors={verifiedDoctors} notVerifiedDoctors={notVerifiedDoctors} doctor={ele} />
                        {/* <p>
                            {ele?.doctor_id?.name} at {ele?.slot}
                          </p>
          
                          <button className="bg-red-500">Cancel</button> */}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No not verified doctors available.</p>
              )}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default Admin;
