import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Atoms, { booking, userId, userRecoil } from "../../Recoils/Atoms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RatingPopup from "../Rating/RatingPopup";
import toast from "react-hot-toast";
import axios from "axios";

export default function List({ bookingDetails }) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useRecoilValue(userRecoil);
  const userid = useRecoilValue(userId);
  const setBookings = useSetRecoilState(booking);
  const setAppointments = useSetRecoilState(Atoms.appointments)
  const navigate = useNavigate();
  // console.dir(bookingDetails);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openPopupCancel, setOpenPopupCancel] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleOpenPopupCancel = () => {
    setOpenPopupCancel(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleClosePopupCancel = () => {
    setOpenPopupCancel(false);
  };

  const handleSubmitRating = async ({ rating, review }) => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/v1/user/rating`,
        {
          rating,
          review,
          doctor_id: bookingDetails?.doctor_id?._id,
          patient_id: userid,
        },
        { withCredentials: true },
        config
      );

      if (
        data.msg == "Review added successfully" ||
        data.msg == "Review Updated Successfully"
      ) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      // toast.error("Error on Backend Side");
      // toast.error(error.data.msg);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
    console.log("Rating submitted:", { rating, review });
  };

  const handleCancelButtonByDoctor = async ({ reason }) => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BACKENDURL
        }/api/v1/booking/cancelBookingByDoctor`,
        {
          id: bookingDetails?._id,
          reason,
        },
        { withCredentials: true },
        config
      );

      if (data) {
        setAppointments((curr) =>
          curr.filter((appt) => appt._id !== bookingDetails?._id)
        );
        toast.success(data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelButtonByPatient = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKENDURL
        }/api/v1/booking/cancelBookingByPatient?id=${bookingDetails?._id}`,
        { withCredentials: true },
        config
      );

      // setBookings((curr) =>
      //   curr.filter((appt) => appt._id !== bookingDetails?._id)
      // );
      if (data) {
        setBookings((curr) =>
          curr.filter((appt) => appt._id !== bookingDetails?._id)
        );
        toast.success(data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExamined = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKENDURL
        }/api/v1/booking/patientExamined?id=${bookingDetails?._id}`,
        { withCredentials: true },
        config
      );

      if (data) {
        // bookingDetails?.status = "completed";
        setAppointments((curr) =>
          curr.map((appointment) =>
            appointment._id === bookingDetails?._id
              ? { ...appointment, status: "completed" }  // Update status
              : appointment
          )
        );
        toast.success(data.msg);
      } else {
        toast.success("Response not comes");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`shadow-lg w-[80vw] p-4 rounded-md lg:flex lg:items-center lg:justify-between ${
          bookingDetails?.status == "cancelled" && user!="Patient" ? "hidden" : "block"
        }`}
      >
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {user == "Patient"
              ? bookingDetails?.doctor_id?.name
              : bookingDetails?.patient_id?.name}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              {user == "Patient" ? (
                <BriefcaseIcon
                  aria-hidden="true"
                  className="mr-1.5 size-5 shrink-0 text-gray-400"
                />
              ) : (
                <SparklesIcon className="mr-1.5 size-5 shrink-0 text-red-500" />
              )}

              {user == "Patient"
                ? bookingDetails?.doctor_id?.qualification
                : `Disease: ${bookingDetails?.patient_id?.disease}`}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              {user == "Patient" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-ml-0.5 mr-1 size-5 text-yellow-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <ChartBarIcon className="-ml-0.5 mr-1 size-5 text-purple-500" />
              )}
              {user == "Patient"
                ? bookingDetails?.doctor_id?.avgRating
                : `Age: ${bookingDetails?.patient_id?.age}`}
            </div>

            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                aria-hidden="true"
                className="mr-1.5 size-5 text-gray-400"
              />
              {user == "Patient"
                ? bookingDetails?.doctor_id?.location
                : bookingDetails?.patient_id?.location}
            </div>

            {user == "Patient" ? (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 size-5 shrink-0 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                {bookingDetails?.doctor_id?.fee}
              </div>
            ) : (
              <div />
            )}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                aria-hidden="true"
                className="mr-1.5 size-5 shrink-0 text-gray-400"
              />
              {new Date(bookingDetails?.date).toLocaleDateString("en-GB")}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="-ml-0.5 mr-1.5 size-5 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {user == "Patient" ? bookingDetails?.slot : bookingDetails?.slot}
            </div>
          </div>
          {bookingDetails?.reason && user == "Patient" ? (
            <p className="text-wrap truncate text-base overflow-hidden">
              <span className="text-red-500 font-medium">
                Reason (Booking Cancel) :{" "}
              </span>
              <span className="truncate mt-4 text-red- font- text-wrap">
                {bookingDetails?.reason}
              </span>
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mt-5  flex lg:ml-4 lg:mt-0">
          {user == "Patient" && bookingDetails?.status !== "completed" ? (
            <span
              onClick={() => {
                navigate("/bookingDoctor", {
                  state: { doctor_id: bookingDetails?.doctor_id?._id },
                });
              }}
              className="hidden sm:block"
            >
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {/* <PencilIcon
              aria-hidden="true"
              className="-ml-0.5 mr-1.5 size-5 text-gray-400"
            /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ml-0.5 mr-1.5 size-5 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Change Slot
              </button>
            </span>
          ) : (
            <div />
          )}

          <span
            onClick={() => {
              if (user == "Patient") {
                navigate("/doctordetails", {
                  state: { user: bookingDetails?.doctor_id },
                });
              } else if (user == "Doctor") {
                navigate("/patientdetails", {
                  state: { user: bookingDetails?.patient_id },
                });
              }
            }}
            className="ml-3 hidden sm:block"
          >
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {/* <LinkIcon
              aria-hidden="true"
              className="-ml-0.5 mr-1.5 size-5 text-gray-400"
            /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="-ml-0.5 mr-1.5 size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              View Profile
            </button>
          </span>

          {/* Popup Component */}
          <RatingPopup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            onSubmit={handleSubmitRating}
          />
          {user == "Patient" ? (
            <span
              onClick={() => {
                handleOpenPopup();
              }}
              className="ml-3 hidden sm:block"
            >
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {/* <LinkIcon
              aria-hidden="true"
              className="-ml-0.5 mr-1.5 size-5 text-gray-400"
            /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-ml-0.5 mr-1.5 size-5 text-yellow-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                Review
              </button>
            </span>
          ) : (
            <span></span>
          )}

          <RatingPopup
            cancel={"cancel"}
            isOpen={openPopupCancel}
            onClose={handleClosePopupCancel}
            onSubmit={
              user == "Patient"
                ? handleCancelButtonByPatient
                : handleCancelButtonByDoctor
            }
          />
          {bookingDetails?.status !== "completed"? <span
            onClick={() => {
              handleOpenPopupCancel();
            }}
            className="ml-3 hidden sm:block"
          >
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {/* <LinkIcon
              aria-hidden="true"
              className="-ml-0.5 mr-1.5 size-5 text-gray-400"
            /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="-ml-0.5 mr-1.5 size-5 text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              Cancel
            </button>
          </span> : ""}

          {user !== "Patient" && bookingDetails?.status !=="completed" ? (
            <span onClick={handleExamined} className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckIcon
                  aria-hidden="true"
                  className="-ml-0.5 mr-1.5 size-5"
                />
                Examined
              </button>
            </span>
          ) : (
            ""
          )}

          {/* Dropdown */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 ml-1.5 size-5 text-gray-400"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  Edit
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  View
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
