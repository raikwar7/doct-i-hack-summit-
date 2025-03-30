import React from "react";
import { Link } from "react-router-dom";

const NavBtn = ({ list }) => {
  return (
    <div
      onClick={list.onclick}
      className={`flex m-2 ${list.dis} justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {/* <li
        className={`p-2 m-2 ${list.col}  rounded-lg font-semibold text-white ${list.dis}`}
      >
        <Link to={`${list.to}`}>{list.label}</Link>
      </li> */}
      <Link to={`${list.to}`}>{list.label}</Link>
    </div>
  );
};

export default NavBtn;
