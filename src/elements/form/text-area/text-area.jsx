import { Textarea } from "@/components/ui/textarea";
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
      <Textarea
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
