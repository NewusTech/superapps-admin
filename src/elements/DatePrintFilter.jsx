import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateComponent from "elements/DateComponent";
import { FiPrinter } from "react-icons/fi";

const DatePrintFilter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <DateComponent
        selectedDate={startDate}
        onChangeDate={(date) => setStartDate(date)}
      />
      <span className="text-sm text-main">to</span>
      <DateComponent
        selectedDate={endDate}
        onChangeDate={(date) => setEndDate(date)}
      />
      <button className="flex items-center space-x-1 text-xs text-main border border-gray-500 rounded px-4 py-2 h-10 hover:text-white hover:bg-main hover:border-main duration-300">
        <FiPrinter className="w-5 h-5" />
        <span className="text-[16px]">Print</span>
      </button>
    </div>
  );
};

export default DatePrintFilter;
