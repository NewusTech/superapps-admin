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
  getPackageHistoryByResi,
  updatePackagePaymentStatus,
  updatePaymentStatus,
} from "service/api";
import {
  formatLongDate,
  formatRupiah,
  formatTanggalPanjang,
  formatTime,
} from "helpers";
import Swal from "sweetalert2";

export default function UpdateStatusPembayaranPackage() {
  const navigate = useNavigate();
  const { kodePesanan } = useParams();
  const { kodeResi } = useParams();
  const [packages, setPackages] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPackageByResi = async (kode) => {
    try {
      const response = await getPackageHistoryByResi(kode);

      setPackages(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPackageByResi(kodeResi);
  }, [kodeResi]);

  // let time;
  // if (packages?.jam_berangkat) {
  //   time = formatTime(packages?.jam_berangkat);
  // }

  let hargaRupiah;
  if (packages?.biaya) {
    hargaRupiah = formatRupiah(packages?.biaya);
  }

  const handleUpdatePaymentStatus = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await updatePackagePaymentStatus(kodeResi);

      console.log(response, "ini rees");

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menyelesaikan pembayaran paket!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate(
          `/package/package-payment-status/${response?.data?.kode_paket}`
        );
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
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Status Package</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="bg-white flex flex-col w-full p-8 gap-y-4">
        <div className="flex w-full">
          <p className="font-semibold text-neutral-700 text-[18px]">
            Rincian Pembayaran
          </p>
        </div>

        <div className="grid grid-rows-8 w-full gap-y-4">
          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">Jenis</p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {packages?.jenis_paket}
            </p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Total Berat
            </p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {packages?.total_berat}
            </p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Tanggal Dikirim
            </p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {formatTanggalPanjang(packages?.tanggal_dikirim)}
            </p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">
              Tanggal Diterima
            </p>

            <p className="font-normal text-[16px] text-neutral-700">
              : {formatTanggalPanjang(packages?.tanggal_diterima)}
            </p>
          </div>

          <div className="grid grid-cols-2 w-full">
            <p className="font-normal text-[16px] text-neutral-700">Biaya</p>

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
