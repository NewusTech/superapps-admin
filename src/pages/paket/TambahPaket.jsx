import Button from "elements/Button";
import Buttons from "elements/form/button/button";
import FormInput from "elements/form/input/input";
import FormLabel from "elements/form/label/label";
import InputDate from "elements/InputDate";
import InputText from "elements/InputText";
import InputTextArea from "elements/InputTextArea";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import { createNewPackage } from "service/api";
import Swal from "sweetalert2";

export default function TambahPaket() {
  const navigate = useNavigate();
  const { quill: quillPengirim, quillRef: quillRefPengirim } = useQuill();
  const { quill: quillPenerima, quillRef: quillRefPenerima } = useQuill();
  const { quill: quillTujuan, quillRef: quillRefTujuan } = useQuill();
  const [form, setForm] = useState({
    nama_pengirim: "",
    nama_penerima: "",
    alamat_pengirim: "",
    alamat_penerima: "",
    tujuan: "",
    tanggal_dikirim: "",
    tanggal_diterima: "",
    no_telp_pengirim: "",
    no_telp_penerima: "",
    jenis_paket: "",
    biaya: "",
    total_berat: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (quillPengirim) {
      quillPengirim.on("text-change", () => {
        setForm((prevData) => ({
          ...prevData,
          alamat_pengirim: quillPengirim.root.innerHTML,
        }));
      });
    }

    if (quillPenerima) {
      quillPenerima.on("text-change", () => {
        setForm((prevData) => ({
          ...prevData,
          alamat_penerima: quillPenerima.root.innerHTML,
        }));
      });
    }

    if (quillTujuan) {
      quillTujuan.on("text-change", () => {
        setForm((prevData) => ({
          ...prevData,
          tujuan: quillTujuan.root.innerHTML,
        }));
      });
    }
  }, [quillPengirim, quillPenerima, quillTujuan]);

  const handleNewPackage = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await createNewPackage({
        ...form,
        biaya: Number(form.biaya),
        total_berat: Number(form.total_berat),
      });

      console.log(response, "ini res");

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan paket!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate(`/package/payment-step/${response.data.resi}`);
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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/package">Paket</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Paket</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white p-5 mt-8 rounded-lg">
        <form onSubmit={handleNewPackage}>
          <div className="flex flex-col w-full gap-y-6">
            <div className="w-full flex flex-col gap-y-3">
              <h3 className="font-semibold text-[18px] text-neutral-700">
                Detail Pengirim
              </h3>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Nama Pengirim"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="pengirim"
                    name="nama_pengirim"
                    value={form.nama_pengirim}
                    onChange={(e) =>
                      setForm({ ...form, nama_pengirim: e.target.value })
                    }
                    htmlFor="pengirim"
                    label="Nama Pengirim"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="number"
                    placeholder="Nomor Telepon"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="telepon"
                    name="no_telp_pengirim"
                    value={form.no_telp_pengirim}
                    onChange={(e) =>
                      setForm({ ...form, no_telp_pengirim: e.target.value })
                    }
                    htmlFor="telepon"
                    label="Nomor Telepon"
                    classLabel="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="w-full flex flex-col gap-y-3">
                  <FormLabel
                    htmlFor="alamat-pengirim"
                    name="Alamat Pengirim"
                    className="w-full"
                  />
                  <div
                    className="flex rounded-lg flex-col h-[150px] w-ful border border-textSecondary"
                    ref={quillRefPengirim}></div>
                </div>

                <div className="w-full flex flex-col gap-y-3">
                  <FormLabel
                    htmlFor="alamat-tujuan"
                    name="Tujuan"
                    className="w-full"
                  />
                  <div
                    className="flex flex-col rounded-lg h-[150px] w-ful border border-textSecondary"
                    ref={quillRefTujuan}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="date"
                    placeholder="Tanggal Dikirim"
                    className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="dikirim"
                    name="tanggal_dikirim"
                    value={form.tanggal_dikirim}
                    onChange={(e) =>
                      setForm({ ...form, tanggal_dikirim: e.target.value })
                    }
                    htmlFor="dikirim"
                    label="Tanggal Dikirim"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="jenis_paket"
                    className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="paket"
                    name="jenis_paket"
                    value={form.jenis_paket}
                    onChange={(e) =>
                      setForm({ ...form, jenis_paket: e.target.value })
                    }
                    htmlFor="paket"
                    label="jenis Paket"
                    classLabel="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="number"
                    placeholder="Total Berat"
                    className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="total"
                    name="total_berat"
                    value={form.total_berat}
                    onChange={(e) =>
                      setForm({ ...form, total_berat: e.target.value })
                    }
                    htmlFor="total"
                    label="Total Berat"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="number"
                    placeholder="Biaya"
                    className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="biaya"
                    name="biaya"
                    value={form.biaya}
                    onChange={(e) =>
                      setForm({ ...form, biaya: e.target.value })
                    }
                    htmlFor="biaya"
                    label="Biaya"
                    classLabel="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <h3 className="font-semibold text-[18px] text-neutral-700">
                Detail Penerima
              </h3>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Nama Penerima"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="penerima"
                    name="nama_penerima"
                    value={form.nama_penerima}
                    onChange={(e) =>
                      setForm({ ...form, nama_penerima: e.target.value })
                    }
                    htmlFor="penerima"
                    label="Nama Penerima"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="number"
                    placeholder="Nomor Telepon"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="telepon-penerima"
                    name="no_telp_penerima"
                    value={form.no_telp_penerima}
                    onChange={(e) =>
                      setForm({ ...form, no_telp_penerima: e.target.value })
                    }
                    htmlFor="telepon-penerima"
                    label="Nomor Telepon"
                    classLabel="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="w-full flex flex-col gap-y-3">
                  <FormLabel
                    htmlFor="alamat-penerima"
                    name="Alamat Penerima"
                    className="w-full"
                  />
                  <div
                    className="flex flex-col rounded-lg h-[150px] w-ful border border-textSecondary"
                    ref={quillRefPenerima}></div>
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="date"
                    placeholder="Tanggal Diterima"
                    className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="diterima"
                    name="nama_penerima"
                    value={form.tanggal_diterima}
                    onChange={(e) =>
                      setForm({ ...form, tanggal_diterima: e.target.value })
                    }
                    htmlFor="diterima"
                    label="Tanggal Diterima"
                    classLabel="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 w-full">
            <Buttons
              isLoading={isLoading}
              disables={isLoading ? true : false}
              type="submit"
              className="w-full bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
              name="Pesan"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
