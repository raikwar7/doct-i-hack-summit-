import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Atoms, { userRecoil } from "../../Recoils/Atoms";
import toast from "react-hot-toast";

const Card = ({ user }) => {
  const navigate = useNavigate();
  const isLoginIn = useRecoilValue(Atoms.isLoginIn);
  const User = useRecoilValue(userRecoil);
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm m-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div>
        <h2 className="text-2xl font-bold text-sky-700 mb-3">{user.name}</h2>
        <div className="mb-3 space-y-2">
          <p className="text-gray-600">Email: {user.gmail}</p>
          <p className="text-gray-600">Phone: {user.phone}</p>
          <p className="text-gray-600">Age: {user.age}</p>
          <p className="text-gray-600">Experience: {user.experience}</p>
          <p className="text-gray-600">Licence ID: {user.licence}</p>
          <p className="text-gray-600">Fee: {user.fee}</p>
          <p className="text-gray-600">Qualification: {user.qualification}</p>
          <p className="text-gray-600">Rating: {user.rating}</p>
          <p className="text-gray-600">Specilization: {user.specilization}</p>
        </div>
      </div>
      <button
        className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        onClick={() => {
          if (User !== "Patient") {
            toast.error("Login as Patient");
            navigate("/loginPatient");
            return;
          }
          if (isLoginIn) {
            navigate("/bookingDoctor", { state: { doctor_id: user._id } });
          } else {
            navigate("/loginPatient");
            toast.error("You are Not Login");
          }
        }}
      >
        Book Doctor
      </button>
    </div>
  );
};

export default Card;
