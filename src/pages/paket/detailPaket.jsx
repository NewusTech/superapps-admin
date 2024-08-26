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
import { useParams } from "react-router-dom";
import {
  getDetailPackage,
  getDownloadInvoicePackage,
  getDownloadResiPackage,
} from "service/api";
import { RichTextDisplay } from "elements/richTextDisplay";
import {
  formatDecimalRupiah,
  formatRupiah,
  formatTanggalPanjang,
} from "helpers";

export default function DetailPaket() {
  const { kodeResi } = useParams();
  const [detail, setDetail] = useState();
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isSecondLoading, setIsSecondLoading] = useState(false);

  const fetchDetailPesanan = async (kode) => {
    try {
      const response = await getDetailPackage(kode);

      setDetail(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailPesanan(kodeResi);
  }, [kodeResi]);

  // let time;
  // if (detail?.pesanan?.jam) {
  //   time = formatTime(detail?.pesanan?.jam);
  // }

  // console.log(detail, "detail");

  // const handleDownloadTicket = async (paymentCode) => {
  //   try {
  //     setIsFirstLoading(true);

  //     const response = await getDownloadResiPackage(paymentCode);

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

  //     const response = await getDownloadInvoicePackage(paymentCode);

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
    <section className="min-h-screen pt-20 px-4">
      <div className="my-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/package">Package</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Paket</BreadcrumbPage>
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
              <p className="text-gray-500">: {detail?.nama_pengirim}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Jenis</p>
              <p className="text-gray-500">: {detail?.jenis_paket}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nomor Telepon</p>
              <p className="text-gray-500">: {detail?.no_telp_pengirim}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Total Berat</p>
              <p className="text-gray-500">: {detail?.total_berat}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Alamat</p>
              <div className="text-gray-500 flex flex-row gap-x-1">
                : <RichTextDisplay content={detail?.alamat_pengirim} />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Biaya</p>
              <p className="text-gray-500">
                : {detail?.biaya && formatDecimalRupiah(detail?.biaya)}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Alamat</p>
              <div className="text-gray-500 flex flex-row gap-x-1">
                : <RichTextDisplay content={detail?.tujuan} />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Tanggal Pengiriman</p>
              <p className="text-gray-500">
                : {formatTanggalPanjang(detail?.tanggal_dikirim)}
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
              <p className="text-gray-500">: {detail?.nama_penerima}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Nomor Telepon</p>
              <p className="text-gray-500">: {detail?.no_telp_penerima}</p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Alamat</p>
              <div className="text-gray-500 flex flex-row gap-x-1">
                : <RichTextDisplay content={detail?.alamat_penerima} />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal">Tanggal Penerimaan</p>
              <p className="text-gray-500">
                {" "}
                : {formatTanggalPanjang(detail?.tanggal_diterima)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row w-full justify-end gap-x-3 mt-12">
        <div className="flex flex-row w-4/12 gap-x-3">
          <Button
            disabled={isSecondLoading ? true : false}
            onClick={() =>
              handleDownloadInvoice(detail?.pembayaran?.kode_pembayaran)
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
              handleDownloadTicket(detail?.pembayaran?.kode_pembayaran)
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
      </div> */}
    </section>
  );
}
