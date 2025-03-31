import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Atoms from "../../Recoils/Atoms";
import Loading from "../../components/Loading";
// import { storage } from "./firebase";
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
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
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

   // 🔥 Upload file and return the download URL
   const uploadFile = async () => {
    try {
      if (!file) return null;

      const fileName = `${uuidv4()}-${file.name}`; // Unique file name
      const fileRef = ref(storage, `reportFiles/${fileName}`);

      await uploadBytes(fileRef, file); // Upload the file
      const downloadURL = await getDownloadURL(fileRef); // Get file URL

      console.log("File uploaded:", downloadURL);
      toast.success("File uploaded successfully");
      return downloadURL;  // Return the URL for API usage
    } catch (error) {
      toast.error("File upload failed");
      console.error(error);
      return null;
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

      let fileUrl = "";

      if (file) {
        // Wait until the file is uploaded before proceeding
        fileUrl = await uploadFile();

        if (!fileUrl) {
          toast.error("File upload failed!");
          setIsLoading(false);
          return;
        }
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
          reportfile: fileUrl,
        },
        { withCredentials: true },
        config
      );
      if (data.msg == "Booked Successfully") {
        toast.success("Booked Successfully!");
        console.log(data)
        navigate("/");
      } else if (data.msg == "Booking Exist") {
        toast.success("Booking Exist");
      } else {
        toast.error("Some mistake in your inputs");
      }
    } catch (error) {
      toast.error("Error on Backend Side");
      console.log(error)
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
          <label className="block text-gray-700 mb-2">
            Upload Report File (Optional):
          </label>
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
