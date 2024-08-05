import Button from "elements/Button";
import React from "react";
import { MdOutlinePending } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import SuccessIcon from "assets/icons/success.svg";

export default function StatusPembayaran() {
  return (
    <div className="w-1/2 mx-auto">
      <div className="my-5">.</div>
      <div className="flex flex-col gap-4 items-center justify-center">
        {/* <SuccessIcon size={64} className='text-green-500' /> */}
        <img src={SuccessIcon} alt="" />
        <p className="font-bold">Pembayaran Sukses!</p>
      </div>
      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="flex flex-col">
          <span className="text-sm">Nomor Pembayaran</span>
          <span className="text-lg font-semibold">INV0292838JJ</span>
        </div>
        <div className="flex flex-col text-end">
          <span className="text-sm">Nama</span>
          <span className="text-lg font-semibold">Qurrata Aini</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm">Tanggal</span>
          <span className="text-lg font-semibold">24 February 2023</span>
        </div>
        <div className="flex flex-col text-end">
          <span className="text-sm">Jam Berangkat</span>
          <span className="text-lg font-semibold">08.00</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm">Jumlah Dibayarkan</span>
          <span className="text-lg font-semibold">Rp. 350.000</span>
        </div>
        <div className="flex flex-col text-end">
          <span className="text-sm">Rute</span>
          <span className="text-lg font-semibold">Palembang - Lampung</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm">Status</span>
          <span className="text-lg font-semibold">Sukses</span>
        </div>
        <div className="flex flex-col text-end">
          <span className="text-sm">Kursi</span>
          <span className="text-lg font-semibold">8</span>
        </div>
      </div>
      <div className="flex my-4">
        <Button
          text={"Unduh"}
          className={"w-48 mx-auto"}
          icon={<FiDownload />}
        />
      </div>
    </div>
  );
}
