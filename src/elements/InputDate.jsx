import React from "react";
import DatePicker from "react-datepicker";

export default function InputDate({
  label,
  selectedDate,
  onChangeDate,
  showTimeSelect,
  showTimeSelectOnly,
  timeIntervals,
  timeCaption,
}) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={label}>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChangeDate}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="border p-4 rounded-md w-full"
      />
    </div>
  );
}
