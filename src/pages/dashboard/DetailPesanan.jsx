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
  getDownloadInvoice,
  getDownloadTicket,
} from "service/api";
import { Loader, Printer } from "lucide-react";
import { formatTime } from "helpers";
import Swal from "sweetalert2";

export default function DetailPesanan() {
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const [detail, setDetail] = useState();
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isSecondLoading, setIsSecondLoading] = useState(false);

  const fetchDetailPesanan = async (kode) => {
    try {
      const response = await getDetailPesanan(kode);

      setDetail(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailPesanan(bookingCode);
  }, [bookingCode]);

  let time;
  if (detail?.pesanan?.jam) {
    time = formatTime(detail?.pesanan?.jam);
  }

  console.log(detail, "detail");

  const handleDownloadTicket = async (paymentCode) => {
    try {
      setIsFirstLoading(true);

      const response = await getDownloadTicket(paymentCode);

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

  const handleDownloadInvoice = async (paymentCode) => {
    try {
      setIsSecondLoading(true);

      const response = await getDownloadInvoice(paymentCode);

      if (response?.success === true) {
        setIsSecondLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil download invoice!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });

        window.open(response?.data?.link, "_blank");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mendapatkan invoice!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSecondLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-12 px-4">
      <div className="my-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pesanan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Pesanan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col gap-y-3">
        <div className="bg-white flex flex-col w-full p-8 gap-y-4">
          <div className="flex flex-row justify-between w-full">
            <p className="font-semibold text-neutral-700 text-[18px]">
              Rincian Pesanan
            </p>

            <div className="bg-success py-2 px-6 rounded-lg bg-opacity-30">
              <p className="text-success">
                {detail && detail?.pembayaran?.status}
              </p>
            </div>
          </div>

          <div className="grid grid-rows-8 w-full gap-y-4">
            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Nama Pemesan
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                {/* : {detail && detail?.} */}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Nomor Telepon
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                {/* : {order?.rute} */}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Tipe Mobil
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.pesanan?.mobil}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">Sopir</p>

              <p className="font-normal text-[16px] text-neutral-700">
                {/* : {order?.titik_antar} */}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">Rute</p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.pesanan?.kota_asal} -{" "}
                {detail && detail?.pesanan?.kota_tujuan}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Titik Jemput
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.pesanan?.titik_jemput}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Titik Antar
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {detail && detail?.pesanan?.titik_antar}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="font-normal text-[16px] text-neutral-700">
                Jam Keberangkatan
              </p>

              <p className="font-normal text-[16px] text-neutral-700">
                : {time}
              </p>
            </div>
          </div>
        </div>

        {detail &&
          detail?.penumpang?.length > 0 &&
          detail.penumpang.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-white flex flex-col w-full p-8 gap-y-4">
                <div className="flex flex-row justify-between w-full">
                  <p className="font-semibold text-neutral-700 text-[18px]">
                    Detail Penumpang {i + 1}
                  </p>
                </div>

                <div className="grid grid-rows-5 w-full gap-y-4">
                  <div className="grid grid-cols-2 w-full">
                    <p className="font-normal text-[16px] text-neutral-700">
                      Nama
                    </p>

                    <p className="font-normal text-[16px] text-neutral-700">
                      : {item?.nama}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 w-full">
                    <p className="font-normal text-[16px] text-neutral-700">
                      NIK
                    </p>

                    <p className="font-normal text-[16px] text-neutral-700">
                      : {item?.nik}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 w-full">
                    <p className="font-normal text-[16px] text-neutral-700">
                      Nomor Telepon
                    </p>

                    <p className="font-normal text-[16px] text-neutral-700">
                      : {item?.no_telp}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 w-full">
                    <p className="font-normal text-[16px] text-neutral-700">
                      Email
                    </p>

                    <p className="font-normal text-[16px] text-neutral-700">
                      {/* : {order?.titik_antar} */}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 w-full">
                    <p className="font-normal text-[16px] text-neutral-700">
                      Nomor Kursi
                    </p>

                    <p className="font-normal text-[16px] text-neutral-700">
                      : {item?.kursi}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="flex flex-row w-full justify-end gap-x-3 mt-12">
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
      </div>
    </section>
  );
}