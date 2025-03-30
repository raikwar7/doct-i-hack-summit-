import React, { useState } from "react";
import { LiaEye } from "react-icons/lia";
import { LiaEyeSlash } from "react-icons/lia";
// import { useRecoilValue } from 'recoil';
// import { seletedThemeAtom } from '../../Recoil/Atom';
import Timer from "./Timer";
import { Link } from "react-router-dom";

const InputContainer = ({ detail }) => {
  const [passvisible, setPassvisible] = useState(false);
  // const theme = useRecoilValue(seletedThemeAtom)
  const theme = "dark";

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <label
          className="block text-sm/6 font-medium text-gray-900"
          htmlFor={`${detail?.id}`}
        >
          {detail?.label}
        </label>
        {detail?.id == "password" ? (
          <div className="text-sm">
            <Link
              to="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="relative w-full">
        <input
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder={`${detail?.placeholder}`}
          type={`${detail?.inputType}`}
          name={`${detail?.id}`}
          id={`${detail?.id}`}
          onFocus={() => {
            detail.inputType = "password";
            setPassvisible(false);
          }}
          required
          autoComplete={`${detail?.id}`}
          value={detail?.value ?? detail?.value}
          onChange={(event) => {
            detail?.onchange(event);
          }}
        />

        {detail?.id == "password" ? (
          <span
            onClick={() => {
              if (passvisible) {
                detail.inputType = "password";
                setPassvisible(false);
              } else {
                detail.inputType = "text";
                setPassvisible(true);
              }
            }}
            className="absolute top-0 cursor-pointer right-3 p-2"
          >
            {passvisible ? (
              <LiaEye className="text-xl" />
            ) : (
              <LiaEyeSlash className="text-xl" />
            )}
          </span>
        ) : (
          ""
        )}
        {detail?.id == "otp" ? (
          <span
            onClick={() => {}}
            className="absolute top-0 font-semibold right-3 p-2 text-heading"
          >
            <Timer />
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default InputContainer;
