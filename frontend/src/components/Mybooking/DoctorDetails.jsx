import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Atoms, { userRecoil } from "../../Recoils/Atoms";
import { ShieldCheckIcon, StarIcon, PhoneIcon, MapPinIcon, CalendarIcon, IdentificationIcon } from "@heroicons/react/24/solid";

const DoctorDetails = () => {
  const location = useLocation();
  const user = location.state?.user;

  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(Atoms.userId);
  const User = useRecoilValue(userRecoil);

  useEffect(() => {
    if (!userId) {
      toast.error("You are not logged in");
      navigate("/loginPatient");
    }
  }, [userId, User, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full transform transition duration-300 hover:scale-105">
        
        {/* Header with Image */}
        <div className="relative">
          <div className="h-40 bg-blue-500 rounded-t-3xl"></div>
          <img
            src="./doctor.png"
            alt="Doctor Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 -bottom-16"
          />
        </div>

        <div className="p-8 text-center mt-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.name}
            <ShieldCheckIcon className="inline-block w-6 h-6 text-blue-500 ml-2" />
          </h2>
          <p className="text-gray-500 text-sm">{user?.gmail}</p>

          <div className="mt-6 grid grid-cols-2 gap-6 text-left">
            {/* Details Section */}
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-green-500" />
              <span className="font-semibold">Phone:</span> {user?.phone}
            </div>

            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-red-500" />
              <span className="font-semibold">Location:</span> {user?.location}
            </div>

            <div className="flex items-center gap-2">
              <IdentificationIcon className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Licence:</span> {user?.licence}
            </div>

            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">Rating:</span> {user?.avgRating}
            </div>

            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Experience:</span> {user?.experience} years
            </div>

            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-indigo-500" />
              <span className="font-semibold">Fee:</span> ₹{user?.fee}
            </div>

            <div className="flex items-center gap-2">
              <IdentificationIcon className="w-5 h-5 text-purple-500" />
              <span className="font-semibold">Specialization:</span> {user?.specilization}
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-green-500" />
              <span className="font-semibold">Qualification:</span> {user?.qualification}
            </div>

            <div className="flex items-center gap-2 col-span-2">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">Profile Created On:</span> {new Date(user?.createdAt).toLocaleDateString("en-GB")}
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => navigate(-1)} 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
