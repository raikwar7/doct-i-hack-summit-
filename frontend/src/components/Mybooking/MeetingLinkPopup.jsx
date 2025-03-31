import React, { useState } from "react";
import toast from "react-hot-toast";

const MeetingLinkPopup = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  // Regex for basic URL validation
  const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleChange = (e) => {
    setLink(e.target.value);
    setError("");  // Clear error on change
  };

  const handleSubmit = () => {
    if (urlRegex.test(link)) {
      toast.success("Valid meeting link!");
      onSave(link);  // Pass the link to parent component
      closePopup();
      setLink("");
    } else {
      setError("Invalid link format. Please enter a valid URL.");
      toast.error("Invalid link format.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      {/* Button to open popup */}
      <button
        onClick={openPopup}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Add Meeting Link
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            
            <h2 className="text-xl font-bold mb-4">Add Meeting Link</h2>
            
            <textarea
              value={link}
              onChange={handleChange}
              placeholder="Enter meeting link (e.g., https://zoom.us/xyz)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            />

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={closePopup}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Save Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingLinkPopup;
