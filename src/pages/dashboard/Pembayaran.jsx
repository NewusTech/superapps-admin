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
  getHistoriPesananByKodePesanan,
} from "service/api";
import DetailPemesan from "elements/cards/DetailPemesan";
import PaymentMethods from "elements/cards/paymentMethods";
import Buttons from "elements/form/button/button";

export default function Pembayaran() {
  const navigate = useNavigate();
  const { kodePesanan } = useParams();
  const [data, setData] = useState({
    orderCode: "",
    metode_id: "",
  });
  const [confirms, setConfirms] = useState();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const fetchConfirmsPesanan = async (kode) => {
    try {
      const response = await getHistoriPesananByKodePesanan(kode);

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
    fetchConfirmsPesanan(kodePesanan);
    fetchAllPaymentMethods();
    setData((prevData) => ({ ...prevData, orderCode: kodePesanan }));
  }, [kodePesanan]);

  const handlePaymentMethodChange = (metode_id) => {
    setSelectedPaymentMethod(metode_id);
    setData((prevData) => ({ ...prevData, metode_id }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    console.log(data, "ini data");

    // try {
    //   setIsLoading(true);

    //   const response = await makingPayment(data);

    //   if (response.success === true) {
    //     setIsLoading(false);
    //     Swal.fire({
    //       icon: "success",
    //       title: "Berhasil melanjutkan ke pembayaran!",
    //       timer: 2000,
    //       showConfirmButton: false,
    //       position: "center",
    //     });
    //     navigate("/");
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: response.message,
    //       timer: 2000,
    //       showConfirmButton: false,
    //       position: "center",
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <section className="min-h-screen pt-20 px-4">
      <div className="my-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pesanan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/order/choosing-car">
                Form Pesanan
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pembayaran Pesanan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col w-full gap-y-3">
        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Rincian Pesanan
            </p>
          </div>

          <div className="grid grid-rows-5 gap-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Mobil</p>
              <p className="text-gray-500">: {confirms?.mobil}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Rute</p>
              <p className="text-gray-500">: {confirms?.rute}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Titik Jemput</p>
              <p className="text-gray-500">: {confirms?.titik_jemput}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Titik Antar</p>
              <p className="text-gray-500">: {confirms?.titik_antar}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Waktu Keberangkatan</p>
              <p className="text-gray-500">: {confirms?.jam_berangkat} WIB</p>
            </div>
          </div>
        </div>

        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Daftar Penumpang
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {confirms &&
              confirms?.penumpang?.map((item, index) => {
                return <DetailPemesan key={index} data={item} index={index} />;
              })}
          </div>
        </div>
      </div>

      <form onSubmit={handlePayment}>
        <div className="my-5 bg-white p-4 rounded-md flex flex-col gap-y-5">
          <p className="font-semibold text-[18px]">Metode Pembayaran</p>
          <div className="flex flex-col w-full gap-y-3">
            <PaymentMethods
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
