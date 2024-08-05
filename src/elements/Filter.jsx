import React from "react";
import { TbFilter, TbFilterOff } from "react-icons/tb";

const Filter = ({ active, handleButtonClick }) => {
  return (
    <button className="text-sm rounded w-[40px] h-[40px]  bg-white text-main border border-main transition duration-300" onClick={handleButtonClick}>
      <div className="flex items-center justify-center">
        {active ? <TbFilterOff size={20} /> : <TbFilter size={20} />}
      </div>
    </button>
  );
};

export default Filter;
