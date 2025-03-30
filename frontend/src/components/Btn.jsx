import React, { useRef } from "react";

const Btn = ({ btninfo }) => {
  const btnref = useRef();
  return (
    <button
      ref={btnref}
      className="flex w-full my-4 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      // className=" drop-shadow-2xl bg-heading brightness-90 text-background border-2 border-black p-2 font-semibold m-1 rounded-lg cursor-pointer"
      onClick={btninfo.onclick}
    >
      {btninfo.label}
    </button>
  );
};

export default Btn;
