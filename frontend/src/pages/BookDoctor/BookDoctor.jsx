import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Atoms from "../../Recoils/Atoms";
import Loading from "../../components/Loading";

const BookDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const doctor_id = location.state?.doctor_id?.toString() || "";
  const userId = useRecoilValue(Atoms.userId);
  const [slot, setSlot] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (doctor_id == "") {
      toast.error("Select Doctor");
      navigate("/searchDoctors");
      return;
    }
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle slot selection
  const handleSlotChange = (e) => {
    setSlot(e.target.value);
  };

  // Handle file upload and preview
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreview(URL.createObjectURL(uploadedFile)); // Generate preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!slot || !selectedDate) {
        toast.error("Please fill all important fields.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/v1/booking/Doctor`,
        {
          date: selectedDate,
          slot,
          doctor_id,
          patient_id: userId,
          reportfile: "file",
        },
        { withCredentials: true },
        config
      );
      if (data.msg == "Booked Successfully") {
        toast.success("Booked Successfully!");
        navigate("/")
      } else if (data.msg == "Booking Exist") {
        toast.success("Booking Exist");
      } else {
        toast.error("Some mistake in your inputs");
      }
    } catch (error) {
      toast.error("Error on Backend Side");
    } finally {
      setIsLoading(false);
    }
  };

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="my-4 bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Form</h2>
        {/* Slot Selection */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 mb-2">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={today}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Slot Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Slot:</label>
          <select
            value={slot}
            onChange={handleSlotChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">-- Choose a Slot --</option>
            <option value="9 AM - 10 AM">9 AM - 10 AM</option>
            <option value="11 AM - 12 PM">11 AM - 12 PM</option>
            <option value="2 PM - 3 PM">2 PM - 3 PM</option>
            <option value="4 PM - 5 PM">4 PM - 5 PM</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload File:</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg"
          />
          <p>Formate - .pdf .jpg .png</p>
        </div>

        {/* File Preview */}
        {filePreview && (
          <div className="mb-4">
            <p className="text-gray-700 mb-2">File Preview:</p>
            <img
              src={file?.type == "application/pdf" ? "pdf.png" : filePreview}
              alt="Preview"
              className="w-full object-cover h-40 rounded-lg"
            />
          </div>
        )}

        {/* Submit Button */}
        {isLoading ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit Booking
          </button>
        )}
      </form>
    </div>
  );
};

export default BookDoctor;
