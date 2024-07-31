import React, { useRef } from "react";

export default function InputText({
  label,
  type = "text",
  placeholder = "typing here",
  className
}) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        className={`border p-3 py-4 rounded-md ${className}`}
        id={label}
        placeholder={placeholder}
      />
    </div>
  );
}
