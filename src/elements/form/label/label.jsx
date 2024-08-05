import React from "react";

export default function FormLabel({ className, name, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={className}>
        {name}
      </label>
    </div>
  );
}
