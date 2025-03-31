import {
  BriefcaseIcon,
  MapPinIcon,
  CheckIcon,
  ChevronDownIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FaUserMd, FaRupeeSign, FaSpinner } from "react-icons/fa";

const List = ({
  doctor,
  showApproveButton,
  setVerifiedDoctors,
  setNotVerifiedDoctors,
  verifiedDoctors,
  notVerifiedDoctors,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyDoctor = (doctorId) => {
    const verifiedDoctor = notVerifiedDoctors.find(
      (doc) => doc?._id === doctorId
    );

    if (!verifiedDoctor) return;

    const updatedNotVerified = notVerifiedDoctors.filter(
      (doc) => doc?._id !== doctorId
    );

    const updatedVerified = [...verifiedDoctors, verifiedDoctor];

    setVerifiedDoctors(updatedVerified);
    setNotVerifiedDoctors(updatedNotVerified);
  };

  const handleDoctorVerified = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/v1/user/doctorVerify?id=${
          doctor?._id
        }`,
        { withCredentials: true },
        config
      );

      if (data) {
        handleVerifyDoctor(doctor?._id);
        toast.success(data.msg);
      } else {
        toast.error("No response received.");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full lg:w-[80vw] p-6 mb-6">
      <div className="flex items-center gap-4">
        {/* Doctor Avatar */}
        <div className="bg-blue-100 p-4 rounded-full">
          <FaUserMd className="text-blue-500 text-3xl" />
        </div>

        <div className="flex-1">
          {/* Doctor Info */}
          <h2 className="text-2xl font-bold text-sky-700">{doctor?.name}</h2>

          <div className="mt-2 flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <BriefcaseIcon className="size-5 mr-2 text-gray-400" />
              <span className="font-medium">{doctor?.qualification}</span>
            </div>

            <div className="flex items-center">
              <StarIcon className="size-5 mr-2 text-yellow-500" />
              <span className="font-medium">
                {doctor?.avgRating || "N/A"} / 5
              </span>
            </div>

            <div className="flex items-center">
              <MapPinIcon className="size-5 mr-2 text-gray-400" />
              <span className="font-medium">{doctor?.location}</span>
            </div>

            <div className="flex items-center">
              <FaRupeeSign className="text-green-500 size-5 mr-2" />
              <span className="font-medium">₹{doctor?.fee}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between items-center mt-6">
        {/* View Profile Button */}
        <button
          onClick={() =>
            navigate("/doctordetails", { state: { user: doctor } })
          }
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300"
        >
          View Profile
        </button>

        {/* Approve Button */}
        {showApproveButton && (
          <button
            onClick={handleDoctorVerified}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300 flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <CheckIcon className="size-5 mr-2" />
            )}
            Approve
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
