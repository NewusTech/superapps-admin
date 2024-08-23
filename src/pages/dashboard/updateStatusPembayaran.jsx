import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "elements/form/button/button";
import {
  getHistoriPesananByKodePesanan,
  updatePaymentStatus,
} from "service/api";
import { formatRupiah, formatTime } from "helpers";
import Swal from "sweetalert2";

export default function UpdateStatusPembayaran() {
  const navigate = useNavigate();
  const { kodePesanan } = useParams();
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderByOrderCode = async (kode) => {
    try {
      const response = await getHistoriPesananByKodePesanan(kode);

      setOrder(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderByOrderCode(kodePesanan);
  }, [kodePesanan]);

  let time;
  if (order?.jam_berangkat) {
    time = formatTime(order?.jam_berangkat);
  }

  let hargaRupiah;
  if (order?.total_harga) {
    hargaRupiah = formatRupiah(order?.total_harga);
  }

  const handleUpdatePaymentStatus = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await updatePaymentStatus(kodePesanan);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menyelesaikan pembayaran!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate(`/order/payment-status/${response?.data?.kode_pembayaran}`);
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
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Status Pesanan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="bg-white flex flex-col w-full p-8 gap-y-4">
        <div className="flex w-full">
          <p className="font-semibold text-neutral-700 text-[18px]">
            Rincian Pesanan
          </p>
        </div>

        <div className="grid grid-rows-8 w-full gap-y-4">
          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">Mobil</p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {order?.mobil}
            </p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">Rute</p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {order?.rute}
            </p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Titik Jemput
            </p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {order?.titik_jemput}
            </p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Titik Antar
            </p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {order?.titik_antar}
            </p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Waktu Berangkat
            </p>

            <p className="font-normal text-[16px] text-neutral-700">: {time}</p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Jumlah Kursi
            </p>

            <p className="font-normal text-[16px] text-neutral-700">: Toyota</p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Harga Per Tiket
            </p>

            <p className="font-normal text-[16px] text-neutral-700">: Toyota</p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Jumlah yang harus dibayar
            </p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {hargaRupiah}
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleUpdatePaymentStatus}
        className="flex flex-row justify-end w-full mt-12">
        <div className="flex flex-row gap-4 items-center justify-end w-full">
          <Buttons
            isLoading={isLoading}
            disables={isLoading ? true : false}
            type="submit"
            className="w-4/12 bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
            name="Selesaikan Pembayaran"
          />
        </div>
      </form>
    </section>
  );
}
