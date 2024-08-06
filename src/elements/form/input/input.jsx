import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function FormInput({
  type,
  placeholder,
  className,
  id,
  onChange,
  value,
  name,
  htmlFor,
  label,
  classLabel,
}) {
  return (
    <div className="flex flex-col gap-y-3">
      <Label className={classLabel} htmlFor={htmlFor}>
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        className={className}
        id={id}
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
}
