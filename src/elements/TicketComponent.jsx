import React from "react";
import IconDuration from "assets/icons/duration.svg";
import { formatTanggalPanjang, formatTime } from "helpers";
import { Link } from "react-router-dom";

export default function TicketComponent({ data }) {
  let dateBerangkat = "";
  if (data?.tanggal_berangkat) {
    dateBerangkat = formatTanggalPanjang(data?.tanggal_berangkat);
  }
  let timeBerangkat = "";
  if (data?.waktu_keberangkatan) {
    timeBerangkat = formatTime(data?.waktu_keberangkatan);
  }

  return (
    <Link
      to={`/pesanan/kursi/${data?.id}`}
      className="border rounded-md p-4 bg-white hover:bg-gray-50">
      <div className="flex flex-row items-center">
        <p className="text-main font-bold">{data?.master_mobil?.type}</p>
        <div className="ml-auto flex flex-col gap-2">
          <p className="text-main font-bold">Rp. {data?.master_rute?.harga}</p>
          <p className="text-greenColor">{data?.ketersediaan}</p>
        </div>
      </div>
      <div className="h-1 border-t-2 border-dashed my-4" />
      <div className="flex flex-row items-center">
        <div className="flex flex-col gap-2 text-gray-500">
          <p className="">{data?.master_rute?.kota_asal}</p>
          <p className="">{dateBerangkat}</p>
        </div>
        <div className="mx-auto">
          <img
            src={IconDuration}
            alt=""
            srcSet=""
            height={64}
            className="h-12 mt-2"
          />
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <p className="">{data?.master_rute?.kota_tujuan}</p>
          <p className="">{dateBerangkat}</p>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 font-bold">
        {timeBerangkat}
      </p>
    </Link>
  );
}
