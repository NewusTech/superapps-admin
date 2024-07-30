import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as IconPrint } from "../assets/icons/Print.svg";
import DateComponent from "components/DateComponent";

const DatePrintFilter = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
      <button className="flex items-center space-x-1 text-xs text-main border border-main rounded px-2 py-1">
        <IconPrint />
        <span>Print</span>
      </button>
    </div>
  );
};

export default DatePrintFilter;
