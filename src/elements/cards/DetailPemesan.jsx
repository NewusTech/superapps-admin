import React from "react";

export default function DetailPemesan({ data, index }) {
  return (
    <div className="flex flex-col w-full gap-y-3">
      <div className="flex w-full">
        <p className="font-semibold text-neutral-700 text-[16px]">
          Penumpang {index + 1}
        </p>
      </div>

      <div className="grid grid-rows-5 gap-y-4">
        <div className="grid grid-cols-2 w-full">
          <p className="font-normal">Nama</p>
          <p className="text-gray-500">: {data?.nama}</p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <p className="font-normal">NIK</p>
          <p className="text-gray-500">: {data?.nik}</p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <p className="font-normal">Email</p>
          <p className="text-gray-500">: {data?.email}</p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <p className="font-normal">Nomor Telepon</p>
          <p className="text-gray-500">: {data?.no_telp}</p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <p className="font-normal">Nomor Kursi</p>
          <p className="text-gray-500">: {data?.kursi}</p>
        </div>
      </div>
    </div>
  );
}
