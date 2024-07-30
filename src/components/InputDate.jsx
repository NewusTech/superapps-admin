import React from 'react'
import DatePicker from "react-datepicker";


export default function InputDate({
    label,
    selectedDate,
    onChangeDate
}) {
    return (
        <div className="flex flex-col gap-4">
            <label htmlFor={label}>{label}</label>
            <DatePicker
                selected={selectedDate}
                onChange={onChangeDate}
                dateFormat="dd-MM-yyyy"
                className="border p-4 rounded-md w-full"
            />
        </div>
    )
}
