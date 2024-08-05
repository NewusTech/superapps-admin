import React from "react";

export default function FormTextArea({
  id,
  name,
  placeholder,
  onChange,
  value,
  className,
}) {
  return (
    <>
      <textarea
        name={name}
        value={value}
        id={id}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}
