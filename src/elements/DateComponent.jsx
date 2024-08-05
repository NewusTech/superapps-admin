import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as IconCalendar } from "assets/icons/calendar.svg";

export default function DateComponent({ selectedDate, onChangeDate }) {
  return (
    <div className="flex items-center border border-gray-500 rounded-md px-2 py-1 text-xs w-fit">
      <DatePicker
        selected={selectedDate}
        onChange={onChangeDate}
        dateFormat="dd-MM-yyyy"
        className="outline-none w-20 h-8"
        placeholderText="dd-mm-yyy"
      />
      <IconCalendar className="w-5 h-5" />
    </div>
  );
}
