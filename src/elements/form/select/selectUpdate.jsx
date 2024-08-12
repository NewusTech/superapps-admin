import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function SelectUpdate({
  htmlFor,
  label,
  classLabel,
  selectValue,
  data,
  id,
  change,
  name,
  value,
  ...props
}) {
  return (
    <div className="flex flex-col justify-start w-full gap-y-3">
      <Label htmlFor={htmlFor} className={classLabel}>
        {label}
      </Label>

      <div className="flex flex-row items-center justify-between border border-textSecondary rounded-md appearance-none bg-neutral-50 md:h-[40px] w-full mx-0 pr-2">
        <select
          name={name}
          id={id}
          value={value}
          onChange={change}
          className="appearance-none w-full bg-transparent rounded-full pl-4 p-2 outline-none border-none">
          <option value="" disabled>
            {selectValue}
          </option>
          {data &&
            data.map((item, i) => (
              <option key={i} value={item.id}>
                {item?.nama || item?.type || item?.rute}
              </option>
            ))}
        </select>

        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
}
