import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Buttons from "elements/form/button/button";
import FormInput from "elements/form/input/input";
import FormLabel from "elements/form/label/label";
import FormTextArea from "elements/form/text-area/text-area";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverById, updateDriver } from "service/api";
import Swal from "sweetalert2";

export default function DriverUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    no_telp: "",
    tanggal_bergabung: "",
    alamat: "",
  });

  const fetchDriver = async (id) => {
    try {
      const response = await getDriverById(id);

      setForm(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDriver(id);
  }, [id]);

  const handleUpdateDriver = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await updateDriver(id, form);

      console.log(response, "ini response");

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate supir!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/driver");
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
            <BreadcrumbLink href="/driver">Sopir</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Sopir</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white mt-10 w-full">
        <form onSubmit={handleUpdateDriver} className="p-10">
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-x-3">
              <FormInput
                type="text"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                htmlFor="nama-sopir"
                name="nama"
                label="Nama Sopir"
                placeholder="Nama Sopir"
                id="nama-sopir"
                className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                classLabel="w-full"
              />

              <FormInput
                type="text"
                value={form.nik}
                onChange={(e) => setForm({ ...form, nik: e.target.value })}
                htmlFor="nik"
                name="nik"
                label="NIK"
                placeholder="NIK"
                id="nik"
                className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                classLabel="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-x-3">
              <FormInput
                type="text"
                value={form.no_telp}
                onChange={(e) => setForm({ ...form, no_telp: e.target.value })}
                htmlFor="telepon"
                name="no_telp"
                label="Nomor Telepon"
                placeholder="Nomor Telepon"
                id="telepon"
                className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                classLabel="w-full"
              />

              <FormInput
                type="date"
                value={form.tanggal_bergabung}
                onChange={(e) =>
                  setForm({ ...form, tanggal_bergabung: e.target.value })
                }
                htmlFor="tanggal-bergabung"
                name="tanggal_bergabung"
                label="Tanggal Bergabung"
                placeholder="Tanggal Bergabung"
                id="tanggal-bergabung"
                className="w-full border block border-outlineBorder rounded-md h-[40px] pl-3"
                classLabel="w-full"
              />
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <FormLabel htmlFor="alamat" name="Alamat" className="w-full" />

              <FormTextArea
                value={form.alamat}
                name="alamat"
                id="alamat"
                placeholder="Alamat"
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
              />
            </div>
          </div>
          <div className="pt-10 w-full">
            <Buttons
              isLoading={isLoading}
              disables={isLoading ? true : false}
              type="submit"
              className="w-full bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
              name="Simpan"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
