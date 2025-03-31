import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import InputContainer from "../../components/InputContainer/InputContainer";
import Option from "../../components/Option";
import Loading from "../../components/Loading";
import Btn from "../../components/Btn";
import toast from "react-hot-toast";
import axios from "axios";
import Card from "../../components/BookDoctor/Card";

const SearchDoctors = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search_by, setSearch_by] = useState("doctor_id");
  const [doctor_id, setDoctor_id] = useState("");
  const [location, setLocation] = useState("");
  const [specilization, setSpecilization] = useState("");
  const [users, setUsers] = useState([]);

  const specilizationArr = [
    { val: "", name: "Choose Specialization" },
    { val: "Dermatology", name: "Dermatology" },
    { val: "Neurology", name: "Neurology" },
    { val: "Gastroenterology", name: "Gastroenterology" },
    { val: "Cardiology", name: "Cardiology" },
    { val: "Pulmonology", name: "Pulmonology" },
    { val: "Orthopedics", name: "Orthopedics" },
    { val: "Urology", name: "Urology" },
  ];

  const locationArr = [
    { val: "", name: "Select Location" },
    { val: "Hyderabad", name: "Hyderabad" },
    { val: "Mumbai", name: "Mumbai" },
    { val: "Pune", name: "Pune" },
    { val: "Bangalore", name: "Bangalore" },
    { val: "Delhi", name: "Delhi" },
  ];

  const searchOptions = [
    {
      label: "Search By",
      sele: "search_by",
      opt: [
        { val: "doctor_id", name: "Doctor ID" },
        { val: "credentials", name: "Credentials" },
      ],
    },
  ];

  const credentialsData = [
    { label: "Location", sele: "location", opt: [...locationArr] },
    { label: "Specialization", sele: "specilization", opt: [...specilizationArr] },
  ];

  const btninfo = {
    label: "Search For Doctor",
    onclick: async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        if (doctor_id === "" && (location === "" || specilization === "")) {
          toast.error("Please Fill Up Important Details");
          return;
        }
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/v1/user/searchDoctor`,
          { doctor_id, location, specilization },
          { withCredentials: true }
        );
        if (data.length) {
          setUsers(data);
        } else {
          toast.error("Not Found with Credentials");
          setUsers([]);
        }
      } catch (error) {
        toast.error("Error on Backend Side");
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-100 p-5">
      {/* Search Card */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg border border-sky-400">
        <h2 className="text-2xl font-semibold text-sky-900 mb-5 text-center">
          Search for a Doctor
        </h2>

        {/* Search Type */}
        {searchOptions.map((ele, idx) => (
          <Option
            key={idx}
            opt={ele}
            setUsers={setUsers}
            setSearch_by={setSearch_by}
            setDoctor_id={setDoctor_id}
            setLocation={setLocation}
            setSpecilization={setSpecilization}
          />
        ))}

        {/* Search By Doctor ID */}
        {search_by === "doctor_id" ? (
          <InputContainer
            detail={{
              label: "Doctor ID",
              id: "doctor_id",
              placeholder: "Enter Doctor ID",
              inputType: "text",
              onchange: (event) => setDoctor_id(event.target.value),
            }}
          />
        ) : (
          // Search By Credentials
          <form>
            {credentialsData.map((ele, idx) => (
              <Option
                key={idx}
                opt={ele}
                setLocation={setLocation}
                setSpecilization={setSpecilization}
              />
            ))}
          </form>
        )}

        {/* Search Button */}
        <div className="flex justify-center mt-5">
          {isLoading ? <Loading /> : <Btn btninfo={btninfo} />}
        </div>
      </div>

      {/* Display Doctors */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SearchDoctors;
