import React from "react";
import IconDuration from "assets/icons/duration.svg";

export default function TicketComponent({ data }) {
  return (
    <div className="border rounded-md p-4 bg-white hover:bg-gray-50">
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
        <div className="mx-auto">
          <img src={IconDuration} alt="" srcset="" height={64} className="h-12 mt-2" />
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <p className="">Lampung</p>
          <p className="">24 Feb 2023</p>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 font-bold">19.00</p>
    </div>
  );
}
