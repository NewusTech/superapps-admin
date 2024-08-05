import { Loader } from "lucide-react";
import React from "react";

export default function Buttons({ className, onClick, name, isLoading }) {
  return (
    <button type="submit" className={className} onClick={onClick}>
      {isLoading ? <Loader className="animate-spin" /> : name}
    </button>
  );
}
