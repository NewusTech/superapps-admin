import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdPhonePortrait } from "react-icons/io";
import { PiCreditCard, PiMoney } from "react-icons/pi";
import { AiOutlineBank } from "react-icons/ai";
import PaymentItemComponent from "elements/PaymentItemComponent";
import Money from "assets/icons/money.svg";
import Button from "elements/Button";
import { getHistoriPesananByKodePesanan } from "service/api";

export default function Pembayaran() {
  const { kodePesanan } = useParams();
  const [confirms, setConfirms] = useState();

  console.log(kodePesanan, "kode pesanan");

  const fetchConfirmsPesanan = async (kode) => {
    try {
      const response = await getHistoriPesananByKodePesanan(kode);

      setConfirms(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConfirmsPesanan(kodePesanan);
  }, [kodePesanan]);

  console.log(confirms, "confirms");

  return (
    <section className="min-h-screen pt-20 px-4">
      <div className="my-5">
        <div>
          <Link to={"/"} className="text-main">
            Pesanan
          </Link>{" "}
          &gt;{" "}
          <Link to={"/pesanan/tambah"} className="text-main">
            Tambah Pesanan
          </Link>{" "}
          &gt;{" "}
          <Link to={"/pesanan/kursi"} className="text-main">
            Tambah Kursi
          </Link>{" "}
          &gt; Pembayaran
        </div>
      </div>
      <div className="flex flex-col w-full gap-y-3">
        <div className="bg-white grid grid-rows-5 gap-4 p-8">
          <div className="grid grid-cols-2 w-full">
            <p className="font-bold">Nama</p>
            <p className="text-gray-500">: Nama</p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-bold">Nomor Telepon</p>
            <p className="text-gray-500">: Nomor Telepon</p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-bold">Tanggal</p>
            <p className="text-gray-500">: Tanggal</p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-bold">Jam Berangkat</p>
            <p className="text-gray-500">: Jam Berangkat</p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-bold">Rute</p>
            <p className="text-gray-500">: Rute</p>
          </div>
        </div>
        <div className="bg-white grid grid-cols-2 p-8">
          <div className="grid grid-rows-5 gap-y-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Nama</p>
              <p className="text-gray-500">: Nama</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Nomor Telepon</p>
              <p className="text-gray-500">: Nomor Telepon</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Tanggal</p>
              <p className="text-gray-500">: Tanggal</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Jam Berangkat</p>
              <p className="text-gray-500">: Jam Berangkat</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Rute</p>
              <p className="text-gray-500">: Rute</p>
            </div>
          </div>

          <div className="grid grid-rows-5 gap-y-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Nama</p>
              <p className="text-gray-500">: Nama</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Nomor Telepon</p>
              <p className="text-gray-500">: Nomor Telepon</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Tanggal</p>
              <p className="text-gray-500">: Tanggal</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Jam Berangkat</p>
              <p className="text-gray-500">: Jam Berangkat</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-bold">Rute</p>
              <p className="text-gray-500">: Rute</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 bg-white p-4 rounded-md">
        <p className="font-bold">Metode Pembayaran</p>
        <div className="flex flex-col w-full gap-y-3">
          <div className="">
            <PaymentItemComponent
              title={"e-Money"}
              icon={<PiMoney className="text-softBlue" size={24} />}
            />
          </div>
          <div className="">
            <PaymentItemComponent
              title={"Virtual Account"}
              icon={<IoMdPhonePortrait className="text-softBlue" size={24} />}
            />
          </div>
          <div className="">
            <PaymentItemComponent
              title={"Bank Transfer"}
              icon={<AiOutlineBank className="text-softBlue" size={24} />}
            />
          </div>
          <div className="">
            <PaymentItemComponent
              title={"Credit Card"}
              icon={<PiCreditCard className="text-softBlue" size={24} />}
            />
          </div>
          <div className="">
            <PaymentItemComponent title={"Cash"} icon={<img src={Money} />} />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <div className="ml-auto">
          <p className="text-main font-bold">Rp. 350.000</p>
          <p className="text-sm">Total harga</p>
        </div>
        <Button text={"Bayar"} className={"w-32"} />
      </div>
    </section>
  );
}
