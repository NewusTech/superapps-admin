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
  createTravelCarRent,
  getAllPaymentMethods,
  getDetailMasterTravelCarRent,
  getPackageHistoryByResi,
  makingPackagePayment,
  makingPayment,
  updateRentalStatusPayment,
} from "service/api";
import Buttons from "elements/form/button/button";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import PackagePaymentMethods from "elements/cards/packagePaymentMethods";
import { RichTextDisplay } from "elements/richTextDisplay";
import { formatTanggalPanjang } from "helpers";

export default function PembayaranRental() {
  const navigate = useNavigate();
  const { kodeResi } = useParams();
  const [data, setData] = useState({
    metode_id: "",
  });
  const [detail, setDetail] = useState({
    nama: "",
    email: "",
    nik: "",
    no_telp: "",
    alamat: "",
    area: "",
    durasi_sewa: "",
    tanggal_mulai_sewa: "",
    tanggal_akhir_sewa: "",
    alamat_keberangkatan: "",
    mobil_rental_id: "",
    jam_keberangkatan: "",
    all_in: "",
  });
  const [car, setCar] = useState();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [paymentCode, setPaymentCode] = useState();

  useEffect(() => {
    setDetail({
      nama: localStorage.getItem("nama"),
      email: localStorage.getItem("email"),
      nik: localStorage.getItem("nik"),
      no_telp: localStorage.getItem("no_telp"),
      alamat: localStorage.getItem("alamat"),
      area: localStorage.getItem("area"),
      durasi_sewa: localStorage.getItem("durasi_sewa"),
      tanggal_mulai_sewa: localStorage.getItem("tanggal_mulai_sewa"),
      tanggal_akhir_sewa: localStorage.getItem("tanggal_akhir_sewa"),
      alamat_keberangkatan: localStorage.getItem("alamat_keberangkatan"),
      mobil_rental_id: localStorage.getItem("mobil_rental_id"),
      jam_keberangkatan: localStorage.getItem("jam_keberangkatan"),
      all_in: localStorage.getItem("all_in"),
    });
  }, []);

  const fetchDetailCar = async (id) => {
    try {
      const response = await getDetailMasterTravelCarRent(id);

      setCar(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("mobil_rental_id")) {
      fetchDetailCar(localStorage.getItem("mobil_rental_id"));
    }
  }, [localStorage.getItem("mobil_rental_id")]);

  const fetchAllPaymentMethods = async () => {
    try {
      const response = await getAllPaymentMethods();

      setPayments(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPaymentMethods();
  }, [kodeResi]);

  const handlePaymentMethodChange = (metode_id) => {
    setSelectedPaymentMethod(metode_id);
    setData((prevData) => ({ ...prevData, metode_id }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    let isAllIn;
    if (detail?.all_in === "false") {
      isAllIn = 0;
    } else {
      isAllIn = 1;
    }

    const datas = {
      ...detail,
      durasi_sewa: Number(detail.durasi_sewa),
      mobil_rental_id: Number(detail?.mobil_rental_id),
      all_in: isAllIn,
      metode_id: data?.metode_id,
    };

    try {
      setIsLoading(true);

      const response = await createTravelCarRent(datas);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil memesan rental Travel!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });

        setPaymentCode(response.data.kode_pembayaran);
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

  const handleUpdatePaymentStatus = async (e) => {
    e.preventDefault();

    try {
      setIsFirstLoading(true);

      const response = await updateRentalStatusPayment(paymentCode);

      if (response.success === true) {
        setIsFirstLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menyelesaikan pembayaran rental!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        localStorage.clear();
        navigate(`/travel-car-rent`);
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
      setIsFirstLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 px-4">
      <div className="my-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/travel-car-rent">Rental</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/travel-car-rent/order-travel-car-rent">
                Tambah Order Rental
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pembayaran Rental</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col w-full gap-y-3">
        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Rincian Informasi Penyewa
            </p>
          </div>

          <div className="grid grid-rows-3 grid-cols-2 gap-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nama</p>
              <p className="text-gray-500">: {detail && detail?.nama}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nik</p>
              <p className="text-gray-500">: {detail && detail?.nik}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Email</p>
              <p className="text-gray-500">: {detail && detail?.email}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nomor Telepon</p>
              <p className="text-gray-500">: {detail && detail?.no_telp}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Alamat</p>
              <p className="text-gray-500">: {detail && detail?.alamat}</p>
            </div>
          </div>
        </div>

        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Rincian Sewa & Rental Mobil
            </p>
          </div>

          <div className="grid grid-rows-8 gap-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Mobil</p>
              <p className="text-gray-500">
                : {car?.id === Number(detail?.mobil_rental_id) ? car?.type : ""}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Area</p>
              <p className="text-gray-500">: {detail && detail?.area}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Tanggal Mulai Sewa</p>
              <p className="text-gray-500">
                : {detail && formatTanggalPanjang(detail?.tanggal_mulai_sewa)}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Tanggal Akhir Sewa</p>
              <p className="text-gray-500">
                : {detail && formatTanggalPanjang(detail?.tanggal_akhir_sewa)}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Durasi Sewa</p>
              <p className="text-gray-500">
                : {detail && detail?.durasi_sewa} Hari
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Jam Keberangkatan</p>
              <p className="text-gray-500">
                : {detail && detail?.jam_keberangkatan} WIB
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Alamat Keberangkatan</p>
              <p className="text-gray-500">
                : {detail && detail?.alamat_keberangkatan}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">All In</p>
              <p className="text-gray-500">: {detail && detail?.all_in}</p>
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
            {detail.all_in === false ? (
              <p className="text-main font-bold">
                Rp. {Number(car?.biaya_sewa) * Number(detail?.durasi_sewa)}
              </p>
            ) : (
              <p className="text-main font-bold">
                Rp. {Number(car?.biaya_all_in) * Number(detail?.durasi_sewa)}
              </p>
            )}
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

      <div>
        <form
          onSubmit={handleUpdatePaymentStatus}
          className="flex flex-row justify-end w-full mt-12">
          <div className="flex flex-row gap-4 items-center justify-end w-full">
            <Buttons
              isLoading={isFirstLoading}
              disables={isFirstLoading ? true : false}
              type="submit"
              className="w-4/12 bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
              name="Selesaikan Pembayaran"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
