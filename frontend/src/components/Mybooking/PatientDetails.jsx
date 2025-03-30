import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMale, FaFemale } from "react-icons/fa";
import Atoms, { userRecoil } from "../../Recoils/Atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import {
  MapPinIcon,
} from "@heroicons/react/20/solid";

const PatientDetails = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(Atoms.userId);
  const User = useRecoilValue(userRecoil)
  useEffect(()=>{
    if (!userId || User == "Patient") {
      toast.error("You are not Logged in");
      navigate("/loginDoctor");
      return;
    }
  },[userId, User])
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="bg-orange-100 h-24 rounded-t-xl relative">
          <img
            src={"./user-profile.png"}
            alt="Profile"
            className="w-24 h-24 bg-cover rounded-full border-4 border-white bg-white shadow-md absolute left-1/2 transform -translate-x-1/2 -bottom-12"
          />
        </div>

        {/* Profile Details */}
        <div className="mt-8 p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center">
            {user?.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 m-1 text-blue-600"
            >
              <path
                fill-rule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              />
            </svg>
          </h2>
          <p className="text-gray-600">{user?.gmail}</p>

          {/* Info Section */}
          <div className="mt-4 space-y-3 text-left text-gray-600">
            <div className="flex items-center ">
              {/* <FaBuilding className="text-blue-500 mr-2" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4 m-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="font-semibold  space-x-10">Phone:</span>&nbsp;{" "}
              {user?.phone}
            </div>
            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5 m-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="font-semibold  space-x-10">Age:</span>&nbsp;{" "}
              {user?.age}
            </div>
            <div className="flex items-center text-gray-600">
              {user?.gender == "male" ? (
                <FaMale className="size-5 m-1" />
              ) : (
                <FaFemale />
              )}
              <span className="font-semibold  space-x-10">Gender:</span>&nbsp;{" "}
              {user?.gender}
            </div>

            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5 m-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="font-medium">Disease:</span>&nbsp;{" "}
              {user?.disease}
            </div>
            <div className="flex items-center text-gray-600">
            <MapPinIcon
                aria-hidden="true"
                className="size-5 m-1 text-gray-600"
              />
              <span className="font-medium">Location:</span>&nbsp;{" "}
              {user?.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
