import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import SuccessIcon from "assets/icons/success.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadInvoice,
  getDownloadResiPackage,
  getDownloadTicket,
  getPaymentStatus,
  getPaymentStatusPackage,
} from "service/api";
import { Download, Loader } from "lucide-react";
import {
  formatDecimalRupiah,
  formatLongDate,
  formatTanggalPanjang,
  formatTime,
} from "helpers";
import Swal from "sweetalert2";

export default function StatusPackagePembayaran() {
  const navigate = useNavigate();
  const { kodePaket } = useParams();

  const [payment, setPayment] = useState();
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isSecondLoading, setIsSecondLoading] = useState(false);

  const fetchPaymentStatus = async (kode) => {
    try {
      const response = await getPaymentStatusPackage(kode);

      setPayment(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPaymentStatus(kodePaket);
  }, [kodePaket]);

  let time;
  let date;
  let price;
  if (payment?.waktu || payment?.tanggal || payment?.paket?.biaya) {
    date = formatLongDate(payment?.tanggal);
    time = formatTime(payment?.waktu);
    price = formatDecimalRupiah(payment?.paket?.biaya);
  }

  const handleDownloadTicket = async () => {
    try {
      setIsFirstLoading(true);

      const response = await getDownloadResiPackage(kodePaket);

      if (response?.success === true) {
        setIsFirstLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil download e-ticket!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });

        window.open(response?.data?.link, "_blank");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mendapatkan e-ticket!",
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

  const handleDownloadInvoice = async () => {
    try {
      setIsSecondLoading(true);

      // const response = await getDownloadInvoice(kodePaket);

      // console.log(response, "ini invioice");

      // if (response?.success === true) {
      //   setIsSecondLoading(false);
      //   Swal.fire({
      //     icon: "success",
      //     title: "Berhasil download invoice!",
      //     timer: 2000,
      //     showConfirmButton: false,
      //     position: "center",
      //   });

      //   window.open(response?.data?.link, "_blank");
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Gagal Mendapatkan invoice!",
      //     timer: 2000,
      //     showConfirmButton: false,
      //     position: "center",
      //   });
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSecondLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-row justify-center mt-16">
      <div className="w-8/12 flex flex-col justify-center self-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <img src={SuccessIcon} alt="Success" />
          <p className="font-bold">Pembayaran Sukses!</p>
        </div>
        <div className="grid grid-cols-2 gap-y-8 my-5 mt-12">
          <div className="flex flex-col">
            <span className="text-sm">Nomor Paket</span>
            <span className="text-lg font-semibold">{payment?.kode_paket}</span>
          </div>
          <div className="flex flex-col text-end">
            <span className="text-sm">Metode Pembayaran</span>
            <span className="text-lg font-semibold">
              {payment?.metode?.metode}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Tanggal</span>
            <span className="text-lg font-semibold">{date}</span>
          </div>
          <div className="flex flex-col text-end">
            <span className="text-sm">Jam Berangkat</span>
            <span className="text-lg font-semibold">{time}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Jumlah Dibayarkan</span>
            <span className="text-lg font-semibold">{price}</span>
          </div>
          <div className="flex flex-col text-end">
            <span className="text-sm">Status</span>
            <span className="text-lg font-semibold">{payment?.status}</span>
          </div>
        </div>
        <div className="flex flex-row w-full gap-x-3 mt-12">
          <Button
            disabled={isSecondLoading ? true : false}
            onClick={handleDownloadInvoice}
            type="submit"
            className="w-full border border-textSecondary bg-neutral-50 hover:bg-neutral-100 text-neutral-500 space-x-8">
            {isSecondLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <Download className="w-4 h-4" />

                <p>Invoice</p>
              </>
            )}
          </Button>

          <Button
            onClick={handleDownloadTicket}
            disabled={isFirstLoading ? true : false}
            type="submit"
            className="w-full bg-main hover:bg-primary-600 text-paper space-x-8">
            {isFirstLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <Download className="w-4 h-4" />

                <p>Unduh</p>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
