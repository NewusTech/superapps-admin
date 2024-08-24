import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  getAllPaymentMethods,
  getPackageHistoryByResi,
  makingPackagePayment,
  makingPayment,
} from "service/api";
import Buttons from "elements/form/button/button";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import PackagePaymentMethods from "elements/cards/packagePaymentMethods";
import { RichTextDisplay } from "elements/richTextDisplay";
import { formatTanggalPanjang } from "helpers";

export default function PembayaranPaket() {
  const navigate = useNavigate();
  const { kodeResi } = useParams();
  const [data, setData] = useState({
    paket_id: "",
    metode_id: "",
  });
  const [confirms, setConfirms] = useState();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const fetchConfirmsPackage = async (kode) => {
    try {
      const response = await getPackageHistoryByResi(kode);

      setConfirms(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllPaymentMethods = async () => {
    try {
      const response = await getAllPaymentMethods();

      setPayments(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConfirmsPackage(kodeResi);
    fetchAllPaymentMethods();
  }, [kodeResi]);

  useEffect(() => {
    if (confirms?.id) {
      setData((prevData) => ({ ...prevData, paket_id: confirms?.id }));
    }
  }, [confirms?.id]);

  const handlePaymentMethodChange = (metode_id) => {
    setSelectedPaymentMethod(metode_id);
    setData((prevData) => ({ ...prevData, metode_id }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await makingPackagePayment(data);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil melanjutkan ke pembayaran!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });

        navigate(`/package/update-payment-status-package/${kodeResi}`);
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 px-4">
      <div className="my-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/package">Package</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/package/create-package">
                Tambah Paket
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pembayaran Paket</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col w-full gap-y-3">
        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Rincian Pengirim
            </p>
          </div>

          <div className="grid grid-rows-4 grid-cols-2 gap-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nama</p>
              <p className="text-gray-500">: {confirms?.nama_pengirim}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Jenis</p>
              <p className="text-gray-500">: {confirms?.jenis_paket}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nomor Telepon</p>
              <p className="text-gray-500">: {confirms?.no_telp_pengirim}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Total Berat</p>
              <p className="text-gray-500">: {confirms?.total_berat}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Alamat</p>
              <div className="text-gray-500 flex flex-row gap-x-1">
                : <RichTextDisplay content={confirms?.alamat_pengirim} />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Biaya</p>
              <p className="text-gray-500">: {confirms?.biaya}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Alamat</p>
              <div className="text-gray-500 flex flex-row gap-x-1">
                : <RichTextDisplay content={confirms?.tujuan} />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Tanggal Pengiriman</p>
              <p className="text-gray-500">
                : {formatTanggalPanjang(confirms?.tanggal_dikirim)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Rincian Penerima
            </p>
          </div>

          <div className="grid grid-rows-4 gap-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nama</p>
              <p className="text-gray-500">: {confirms?.nama_penerima}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nomor Telepon</p>
              <p className="text-gray-500">: {confirms?.no_telp_penerima}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Alamat</p>
              <div className="text-gray-500 flex flex-row gap-x-1">
                : <RichTextDisplay content={confirms?.alamat_penerima} />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Tanggal Penerimaan</p>
              <p className="text-gray-500">
                {" "}
                : {formatTanggalPanjang(confirms?.tanggal_diterima)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handlePayment}>
        <div className="my-5 bg-white p-4 rounded-md flex flex-col gap-y-5">
          <p className="font-semibold text-[18px]">Metode Pembayaran</p>
          <div className="flex flex-col w-full gap-y-3">
            <PackagePaymentMethods
              payments={payments}
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="ml-auto">
            <p className="text-main font-bold">Rp. {confirms?.total_harga}</p>
            <p className="text-sm">Total harga</p>
          </div>
          <Buttons
            isLoading={isLoading}
            disables={isLoading ? true : false}
            type="submit"
            className="w-2/12 bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
            name="Bayar"
          />
        </div>
      </form>
    </section>
  );
}
