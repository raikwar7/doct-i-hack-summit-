import React from "react";
// import { useRecoilState, useRecoilValue } from "recoil";
// import Atom, { seletedThemeAtom } from "../../Recoil/Atom";

const Option = ({ opt, setUsers, setSearch_by, setLocation, setDoctor_id, setSpecilization}) => {
  // const [sem, setSem] = useRecoilState(Atom.semAtom);
  // const [branch, setBranch] = useRecoilState(Atom.branchAtom);
  //const theme = useRecoilValue(seletedThemeAtom)

  const theme = "light"

  return (
    <div className="flex flex-col my-2">
      <label className="block text-sm/6 font-medium text-gray-900"  htmlFor={`${opt.sele}`}>{opt.label}</label>
      <select
        name={`${opt.sele}`}
        id={`${opt.sele}`}
        // className={`font-[400] text-lg rounded-lg p-2 m-1 block ${theme === "dark" ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"}`}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        required
        onChange={(event) => {
          console.log("jksjdf");
          console.log(event.target.value);
          // {opt.sele == "sem" ? setSem(event.target.value) : setBranch(event.target.value)};
          if(opt.sele == "location"){
            console.log("loc")
            console.log(location)
            setLocation?.(event.target.value)
          }
          if(opt.sele == "specilization"){
            setSpecilization?.(event.target.value)
          }
          if(opt.sele == "gender"){
            setGender?.(event.target.value)
          }
          if(opt.sele == "search_by"){
            setSearch_by?.(event.target.value)
          }
          // setOption?.(event.target.value)
          if(opt.sele == "search_by"){
            setUsers?.([])
            setDoctor_id?.("")
            setLocation?.("")
            setSpecilization?.("")
          }

        }}
      >
        {opt.opt.map((ele, idx) => {
          return (
            <option key={idx} value={`${ele.val}`}>
              {ele.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Option;
