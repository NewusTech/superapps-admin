import { Button as Btn } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import SuccessIcon from "assets/icons/success.svg";
import { useParams } from "react-router-dom";
import { getPaymentStatus } from "service/api";
import { Download } from "lucide-react";
import { formatDecimalRupiah, formatTanggalPanjang, formatTime } from "helpers";

export default function StatusPembayaran() {
  const { kodePembayaran } = useParams();
  const [payment, setPayment] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPaymentStatus = async (kode) => {
    try {
      const response = await getPaymentStatus(kode);

      setPayment(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPaymentStatus(kodePembayaran);
  }, [kodePembayaran]);

  console.log(payment, "ini payment");

  console.log(kodePembayaran, "ini kode pembayaran");

  let time;
  let date;
  let price;
  if (payment?.jam || payment?.tanggal || payment?.harga) {
    date = formatTanggalPanjang(payment?.tanggal);
    time = formatTime(payment?.jam);
    price = formatDecimalRupiah(payment?.harga);
  }

  return (
    <div className="w-full flex flex-row justify-center mt-16">
      <div className="w-8/12 flex flex-col justify-center self-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <img src={SuccessIcon} alt="Success" />
          <p className="font-bold">Pembayaran Sukses!</p>
        </div>
        <div className="grid grid-cols-2 gap-y-8 my-5 mt-12">
          <div className="flex flex-col">
            <span className="text-sm">Nomor Pembayaran</span>
            <span className="text-lg font-semibold">
              {payment?.kode_pembayaran}
            </span>
          </div>
          <div className="flex flex-col text-end">
            <span className="text-sm">Metode Pembayaran</span>
            <span className="text-lg font-semibold">{payment?.metode}</span>
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
          <Btn
            disabled={isLoading ? true : false}
            type="submit"
            className="w-full border border-textSecondary bg-neutral-50 hover:bg-neutral-100 text-neutral-500 space-x-8">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <Download className="w-4 h-4" />

                <p>Invoice</p>
              </>
            )}
          </Btn>

          <Btn
            disabled={isLoading ? true : false}
            type="submit"
            className="w-full bg-main hover:bg-primary-600 text-paper space-x-8">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <Download className="w-4 h-4" />

                <p>Unduh</p>
              </>
            )}
          </Btn>
        </div>
      </div>
    </div>
  );
}
