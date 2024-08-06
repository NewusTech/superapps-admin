import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React from "react";

export default function Buttons({
  className,
  onClick,
  name,
  isLoading,
  disables,
}) {
  return (
    <Button
      disabled={disables}
      type="submit"
      className={className}
      onClick={onClick}>
      {isLoading ? <Loader className="animate-spin" /> : name}
    </Button>
  );
}
