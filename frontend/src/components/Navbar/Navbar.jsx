import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Atoms from "../../Recoils/Atoms";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [userId, setUserId] = useRecoilState(Atoms.userId);
  const [user, setUser] = useRecoilState(Atoms.userRecoil);
  const setAppointments = useSetRecoilState(Atoms.appointments);
  const setBooking = useSetRecoilState(Atoms.booking);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(Atoms.isLoginIn);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId("");
    setAppointments([]);
    setBooking([]);
    await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/v1/user/logout`, {
      withCredentials: true,
    });
    user === "Patient" ? navigate("/loginPatient") : navigate("/loginDoctor");
    setUser("");
  };

  return (
    <nav className="flex items-center justify-between bg-sky-500 p-4 shadow-md">
      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold">
        Doct-i
      </Link>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/registerDoctor"
              className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Doctor Register
            </Link>
            <Link
              to="/loginDoctor"
              className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Doctor Login
            </Link>
            <Link
              to="/registerPatient"
              className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Patient Register
            </Link>
            <Link
              to="/loginPatient"
              className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Patient Login
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
        <Link
          to="/searchDoctors"
          className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
        >
          Search Doctors
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
