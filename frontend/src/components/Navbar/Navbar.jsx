import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Atoms from "../../Recoils/Atoms";
import axios from "axios";
import toast from "react-hot-toast";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserMd } from "react-icons/fa";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const [userId, setUserId] = useRecoilState(Atoms.userId);
  const [user, setUser] = useRecoilState(Atoms.userRecoil);
  const setAppointments = useSetRecoilState(Atoms.appointments);
  const setBooking = useSetRecoilState(Atoms.booking);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(Atoms.isLoginIn);
  const route = useLocation();
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
        {route.pathname !== "/searchDoctors" && (
          <Link
            to="/searchDoctors"
            className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 transition flex justify-center items-center"
          >
            <MagnifyingGlassIcon className="-ml-0.5 mr-1.5 size-5 text-sky-500" />
            <p className="font-medium">Search Doctors</p>
          </Link>
        )}
        {!isLoggedIn ? (
          <>
            <Link
              to="/loginDoctor"
              className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 transition flex items-center p-4 shadow-md"
            >
              <FaUserMd className="-ml-0.5 mr-1.5 size-5 text-sky-500" />
              <p className="font-medium">Doctor Login</p>
            </Link>
            <Link
              to="/loginPatient"
              className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 flex justify-center items-center transition"
            >
              <UserCircleIcon className="-ml-0.5 mr-1.5 size-5 text-blue-500 " />
              <p className="font-medium">Patient Login</p>
            </Link>
          </>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="bg-white text-sky-600 px-4 py-2 rounded-md hover:bg-gray-200 transition flex justify-center items-center"
            >
              <MagnifyingGlassIcon className="-ml-0.5 mr-1.5 size-5 text-sky-500" />
              <p className="font-medium">Dashboard</p>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex justify-center items-center"
            >
              <AiOutlineLogout className="-ml-0.5 mr-1.5 size-5" />
              <p className="font-medium">Logout</p>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
