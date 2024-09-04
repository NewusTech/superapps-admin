import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDetailPesanan,
  getDetailTravelCarRent,
  getDownloadInvoice,
  getDownloadTicket,
  updateRentalStatusPayment,
} from "service/api";
import { Loader, Printer } from "lucide-react";
import { formatDecimalRupiah, formatTanggalPanjang, formatTime } from "helpers";
import Swal from "sweetalert2";

export default function DetailRental() {
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const { kodePembayaran } = useParams();

  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isSecondLoading, setIsSecondLoading] = useState(false);

  const fetchDetailPesanan = async (kode) => {
    try {
      const response = await getDetailTravelCarRent(kode);

      setDetail(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailPesanan(kodePembayaran);
  }, [kodePembayaran]);

  const handleUpdatePaymentStatus = async (e) => {
    e.preventDefault();

    try {
      setIsFirstLoading(true);

      const response = await updateRentalStatusPayment(kodePembayaran);

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

  // const handleDownloadTicket = async (paymentCode) => {
  //   try {
  //     setIsFirstLoading(true);

  //     const response = await getDownloadTicket(paymentCode);

  //     if (response?.success === true) {
  //       setIsFirstLoading(false);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Berhasil download e-ticket!",
  //         timer: 2000,
  //         showConfirmButton: false,
  //         position: "center",
  //       });

  //       window.open(response?.data?.link, "_blank");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Gagal Mendapatkan e-ticket!",
  //         timer: 2000,
  //         showConfirmButton: false,
  //         position: "center",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsFirstLoading(false);
  //   }
  // };

  // const handleDownloadInvoice = async (paymentCode) => {
  //   try {
  //     setIsSecondLoading(true);

  //     const response = await getDownloadInvoice(paymentCode);

  //     if (response?.success === true) {
  //       setIsSecondLoading(false);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Berhasil download invoice!",
  //         timer: 2000,
  //         showConfirmButton: false,
  //         position: "center",
  //       });

  //       window.open(response?.data?.link, "_blank");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Gagal Mendapatkan invoice!",
  //         timer: 2000,
  //         showConfirmButton: false,
  //         position: "center",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSecondLoading(false);
  //   }
  // };

  return (
    <section className="min-h-screen flex flex-col gap-y-3 pt-12 px-4">
      <div className="my-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/travel-car-rent">
                Rental History
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Rental History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {detail?.status === "Menunggu Pembayaran" && (
        <div className="flex flex-row self-end w-4/12 gap-x-3">
          <form onSubmit={handleUpdatePaymentStatus} className="w-full">
            <Button
              type="submit"
              disabled={isLoading ? true : false}
              className="w-full bg-main hover:bg-primary-600 text-paper space-x-8">
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Selesaikan Pesanan"
              )}
            </Button>
          </form>
        </div>
      )}

      <div className="w-full flex flex-col gap-y-3">
        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex flex-row justify-between w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Detail Sewa
            </p>

            {detail?.status === "Sukses" ? (
              <div className="bg-success py-2 px-6 rounded-lg bg-opacity-30">
                <p className="text-success">Sukses</p>
              </div>
            ) : detail?.status === "Gagal" ? (
              <div className="bg-red-100 px-3 py-2 rounded">
                <span className="text-redColor">Gagal</span>
              </div>
            ) : detail?.status === "Kadaluwarsa" ? (
              <div className="bg-thirtiary-400 px-3 py-2 rounded">
                <span className="text-thirtiary-700">Kadaluwarsa</span>
              </div>
            ) : (
              <div className="bg-gray-300 px-3 py-2 rounded">
                <span className="text-textSecondary">Menunggu</span>
              </div>
            )}
          </div>

          <div className="grid grid-rows-7 w-full gap-y-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">Area</p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.area}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Tanggal
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && formatTanggalPanjang(detail?.tanggal_awal_sewa)} -{" "}
                {detail && formatTanggalPanjang(detail?.tanggal_akhir_sewa)}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Durasi Sewa
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.durasi_sewa} Hari
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Jam Keberangkatan
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && formatTime(detail?.jam_keberangkatan)}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Alamat Keberangkatan
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.alamat_keberangkatan}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">All In</p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.all_in === 0 ? "Tidak" : "Ya"}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">Harga</p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && formatDecimalRupiah(detail?.nominal)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex flex-row justify-between w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Detail Penyewa
            </p>
          </div>

          <div className="grid grid-rows-5 w-full gap-y-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">Nama</p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.nama}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">Nik</p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.nik}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Nomor Telepon
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.no_telp}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">Email</p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.email}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">Alamat</p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.alamat}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full justify-end gap-x-3 mt-12">
        {detail && detail?.status === "Sukses" && (
          <div className="flex flex-row w-4/12 gap-x-3">
            <Button
              disabled={isSecondLoading ? true : false}
              onClick={() =>
                window.open(
                  `https://backend-superapps.newus.id/rental/invoice/${detail?.kode_pembayaran}`
                )
              }
              type="submit"
              className="w-full border border-textSecondary bg-neutral-50 hover:bg-neutral-100 text-neutral-500 space-x-8">
              {isSecondLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <Printer className="w-4 h-4" />

                  <p>Invoice</p>
                </>
              )}
            </Button>

            <Button
              onClick={() =>
                window.open(
                  `https://backend-superapps.newus.id/rental/e-tiket/${detail?.kode_pembayaran}`
                )
              }
              disabled={isFirstLoading ? true : false}
              type="submit"
              className="w-full bg-main hover:bg-primary-600 text-paper space-x-8">
              {isFirstLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <Printer className="w-4 h-4" />

                  <p>Tiket</p>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
