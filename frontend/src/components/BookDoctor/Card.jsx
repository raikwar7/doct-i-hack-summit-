import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Atoms, { userRecoil } from "../../Recoils/Atoms";
import toast from "react-hot-toast";

const Card = ({ user }) => {
  const navigate = useNavigate();
  const isLoginIn = useRecoilValue(Atoms.isLoginIn)
  const User = useRecoilValue(userRecoil)
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 w-72 m-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
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
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => 
        {
          if(User !== "Patient"){
            toast.error("Login as Patient")
            navigate("/loginPatient")
            return;
          };
          if(isLoginIn){
            navigate("/bookingDoctor",{state: {doctor_id: user._id}})
          }
          else{
            navigate("/loginPatient")
            toast.error("You are Not Login")
          }
          // isLoginIn?
          // navigate("/bookingDoctor",{state: {doctor_id: user._id}}):navigate("/loginPatient")
          // toast.error("You are Not Login")
        }
        }
      >
        Book Doctor
      </button>
    </div>
  );
};

export default Card;
