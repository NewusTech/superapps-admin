import { Label } from "@/components/ui/label";
import React from "react";
import DatePicker from "react-datepicker";

export default function InputTime({
  label,
  selectedDate = new Date(),
  onChangeDate,
  className,
}) {
  return (
    <div className="flex flex-col w-full gap-y-3">
      <Label htmlFor={label} className={className}>
        {label}
      </Label>
      <DatePicker
        selected={selectedDate}
        onChange={onChangeDate}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="border h-[40px] pl-3 text-[14px] rounded-md w-full"
      />
    </div>
  );
}
