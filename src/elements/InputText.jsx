import React, { useRef } from "react";

export default function InputText({
  label,
  type = "text",
  placeholder = "typing here",
  className,
}) {
  return (
    <>
      {type === "text-area" ? (
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor={label}>{label}</label>
          <textarea
            className={`border p-3 py-2 h-[200px] rounded-md ${className}`}
            id={label}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label htmlFor={label}>{label}</label>
          <input
            type={type}
            className={`border p-3 py-2 rounded-md ${className}`}
            id={label}
            placeholder={placeholder}
          />
        </div>
      )}
    </>
  );
}
