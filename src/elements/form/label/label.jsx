import { Label } from "@/components/ui/label";
import React from "react";

export default function FormLabel({ className, name, htmlFor }) {
  return (
    <>
      <Label htmlFor={htmlFor} className={className}>
        {name}
      </Label>
    </>
  );
}
