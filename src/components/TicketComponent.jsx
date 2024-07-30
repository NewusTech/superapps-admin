import React from "react";
import { ReactComponent as IconDuration } from "assets/icons/duration.svg";

export default function TicketComponent() {
  return (
    <div className="border rounded-md p-4">
      <div className="flex flex-row items-center">
        <p className="text-main font-bold">Toyota</p>
        <div className="ml-auto flex flex-col gap-2">
          <p className="text-main font-bold">Rp.350.000</p>
          <p className="text-greenColor">Tersedia</p>
        </div>
      </div>
      <div className="h-1 border-t-2 border-dashed my-4" />
      <div className="flex flex-row items-center">
        <div className="flex flex-col gap-2 text-gray-500">
          <p className="">palembang</p>
          <p className="">24 Feb 2023</p>
        </div>
        <IconDuration className="mx-auto" />
        <div className="flex flex-col gap-2 text-gray-500">
          <p className="">Lampung</p>
          <p className="">24 Feb 2023</p>
        </div>
      </div>
    </div>
  );
}
