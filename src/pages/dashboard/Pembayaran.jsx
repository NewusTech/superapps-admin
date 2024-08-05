import React from "react";
import { Link } from "react-router-dom";
import { IoMdPhonePortrait } from "react-icons/io";
import { PiCreditCard, PiMoney } from "react-icons/pi";
import { AiOutlineBank } from "react-icons/ai";
import PaymentItemComponent from "elements/PaymentItemComponent";
import Money from "assets/icons/money.svg";
import Button from "elements/Button";

export default function Pembayaran() {
  return (
    <>
      <div className="my-5">.</div>
      <div className="my-5">
        <div>
          <Link to={"/"} className="text-main">
            Pesanan
          </Link>{" "}
          &gt;{" "}
          <Link to={"/pesanan/tambah"} className="text-main">
            Tambah Pesanan
          </Link>{" "}
          &gt; Pembayaran
        </div>
      </div>
      <div className="bg-white grid grid-cols-4 gap-4 p-8">
        <p className="font-bold">Nama</p>
        <p className="text-gray-500">:Nama</p>
        <p className="font-bold">Nomor Telepon</p>
        <p className="text-gray-500">:Nomor Telepon</p>
        <p className="font-bold">Tanggal</p>
        <p className="text-gray-500">:Tanggal</p>
        <p className="font-bold">Jam Berangkat</p>
        <p className="text-gray-500">:Jam Berangkat</p>
        <p className="font-bold">Rute</p>
        <p className="text-gray-500">:Rute</p>
        <p className="font-bold">Mobil</p>
        <p className="text-gray-500">:Mobil</p>
        <p className="font-bold">Harga</p>
        <p className="text-gray-500">:Harga</p>
        <p className="font-bold">Titik Penjemputan</p>
        <p className="text-gray-500">:Titik Penjemputan</p>
        <p className="font-bold">Kursi</p>
        <p className="text-gray-500">:Kursi</p>
        <p className="font-bold">Biaya Tambahan</p>
        <p className="text-gray-500">:Biaya Tambahan</p>
      </div>
      <div className="my-5">
        <p className="font-bold">Metode Pembayaran</p>
        <div className="my-4">
          <PaymentItemComponent
            title={"e-Money"}
            icon={<PiMoney className="text-softBlue" size={24} />}
          />
        </div>
        <div className="my-4">
          <PaymentItemComponent
            title={"Virtual Account"}
            icon={<IoMdPhonePortrait className="text-softBlue" size={24} />}
          />
        </div>
        <div className="my-4">
          <PaymentItemComponent
            title={"Bank Transfer"}
            icon={<AiOutlineBank className="text-softBlue" size={24} />}
          />
        </div>
        <div className="my-4">
          <PaymentItemComponent
            title={"Credit Card"}
            icon={<PiCreditCard className="text-softBlue" size={24} />}
          />
        </div>
        <div className="my-4">
          <PaymentItemComponent title={"Cash"} icon={<img src={Money} />} />
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <div className="ml-auto">
          <p className="text-main font-bold">Rp. 350.000</p>
          <p className="text-sm">Total harga</p>
        </div>
        <Button text={"Bayar"} className={"w-32"} />
      </div>
    </>
  );
}
