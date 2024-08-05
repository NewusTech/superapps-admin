import React from "react";

export default function FormInputText({
  type,
  placeholder,
  className,
  id,
  onChange,
  value,
  name,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        id={id}
        onChange={onChange}
        value={value}
        name={name}
      />
    </>
  );
}
