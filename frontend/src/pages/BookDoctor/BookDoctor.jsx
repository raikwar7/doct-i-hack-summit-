import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Atoms from "../../Recoils/Atoms";
import Loading from "../../components/Loading";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // For unique file names
import { storage } from "../../../utils/firebase";

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
    if (doctor_id === "") {
      toast.error("Select Doctor");
      navigate("/searchDoctors");
    }
  }, []);

  // Handle date change
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
      setFilePreview(
        uploadedFile.type === "application/pdf"
          ? "pdf_icon.png"
          : URL.createObjectURL(uploadedFile)
      );
    }
  };

  // Upload file to Firebase
  const uploadFile = async () => {
    try {
      if (!file) return null;

      const fileName = `${uuidv4()}-${file.name}`;
      const fileRef = ref(storage, `reportFiles/${fileName}`);

      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      console.log("File uploaded:", downloadURL);
      toast.success("File uploaded successfully");
      return downloadURL;
    } catch (error) {
      toast.error("File upload failed");
      console.error(error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!slot || !selectedDate) {
      toast.error("Please fill all important fields.");
      setIsLoading(false);
      return;
    }

    let fileUrl = "";

    if (file) {
      fileUrl = await uploadFile();
      if (!fileUrl) {
        toast.error("File upload failed!");
        setIsLoading(false);
        return;
      }
    }

    try {
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
          reportfile: fileUrl,
        },
        { withCredentials: true },
        config
      );

      if (data.msg === "Booked Successfully") {
        toast.success("Booked Successfully!");
        navigate("/");
      } else if (data.msg === "Booking Exist") {
        toast.success("Booking Exist");
      } else {
        toast.error("Some mistake in your inputs");
      }
    } catch (error) {
      toast.error("Error on Backend Side");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg transition-all duration-300 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-sky-600 mb-6 text-center">
          Book a Doctor
        </h2>

        {/* Date Selection */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={today}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 transition"
          />
        </div>

        {/* Slot Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Slot:</label>
          <select
            value={slot}
            onChange={handleSlotChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 transition"
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
          <label className="block text-gray-700 font-medium mb-2">
            Upload Report (Optional):
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg shadow-sm transition focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-sm text-gray-500 mt-1">Formats: .pdf, .jpg, .png</p>
        </div>

        {/* File Preview */}
        {filePreview && (
          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-2">File Preview:</p>
            {file?.type === "application/pdf" ? (
              <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg">
                <img src="pdf_icon.png" alt="PDF Icon" className="w-16" />
                <span className="ml-4">{file.name}</span>
              </div>
            ) : (
              <img
                src={filePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
        )}

        {/* Submit Button */}
        {isLoading ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Submit Booking
          </button>
        )}
      </form>
    </div>
  );
};

export default BookDoctor;
