import React from "react";

export default function InputSelect({
  label,
  items,
  placeholder = "--select--",
  value = "",
}) {
  const handleChane = (e) => {
    value = e.target.value;
  };
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={label}>{label}</label>
      <select
        className="border p-3 rounded-md"
        id={label}
        value={value}
        onChange={handleChane}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
      </select>
    </div>
  );
}
