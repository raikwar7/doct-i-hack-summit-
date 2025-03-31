import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMale, FaFemale } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { MapPinIcon } from "@heroicons/react/20/solid";
import Atoms, { userRecoil } from "../../Recoils/Atoms";

const PatientDetails = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(Atoms.userId);
  const User = useRecoilValue(userRecoil);

  useEffect(() => {
    if (!userId || User === "Patient") {
      toast.error("You are not logged in");
      navigate("/loginDoctor");
      return;
    }
  }, [userId, User]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden transform transition duration-300 hover:scale-105">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-32 relative">
          <img
            src={"/user-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 -bottom-16"
          />
        </div>

        {/* Profile Details */}
        <div className="mt-20 p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">{user?.gmail}</p>

          {/* Info Section */}
          <div className="mt-6 space-y-4 text-left">
            <div className="flex items-center gap-3 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Phone:</span> {user?.phone}
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Age:</span> {user?.age}
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              {user?.gender === "male" ? (
                <FaMale className="text-blue-500 w-6 h-6" />
              ) : (
                <FaFemale className="text-pink-500 w-6 h-6" />
              )}
              <span className="font-medium">Gender:</span> {user?.gender}
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPinIcon className="w-6 h-6 text-purple-500" />
              <span className="font-medium">Location:</span> {user?.location}
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Disease:</span> {user?.disease}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;