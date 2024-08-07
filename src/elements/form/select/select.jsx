import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormSelect({
  htmlFor,
  label,
  classLabel,
  data,
  change,
  name,
  value,
  ...props
}) {
  return (
    <div className="flex flex-col gap-y-3">
      <Label className={classLabel} htmlFor={htmlFor}>
        {label}
      </Label>

      <Select name={name} onValueChange={change} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih..." />
        </SelectTrigger>
        <SelectContent>
          {data &&
            data?.map((item, i) => {
              return (
                <SelectItem key={i} value={String(item?.id)}>
                  {item?.nama || item?.type || item?.rute}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
}
