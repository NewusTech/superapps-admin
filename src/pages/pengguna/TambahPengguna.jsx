import Button from "elements/Button";
import InputSelect from "elements/InputSelect";
import InputText from "elements/InputText";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function TambahPengguna() {
  return (
    <>
      <div className="mt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/user">Pengguna</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tambah Pengguna</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-14 bg-white p-4">
        <div className="grid grid-cols-2 gap-8">
          <InputText
            label={"Nama Lengkap"}
            placeholder="Masukan Nama Lengkap"
          />
          <InputText
            type="email"
            label={"Email"}
            placeholder="contoh@mail.com"
          />
          <InputText
            label={"Nomor Telepon"}
            placeholder="Masukan Nomor Telepon"
          />
          <InputSelect label={"Role"} placeholder="Pilih Role" />
          <InputSelect label={"Cabang"} placeholder="Pilih Cabang" />
        </div>
        <div className="w-full mt-10">
          <Button text={"Tambah"} className={"w-full h-14"} />
        </div>
      </div>
    </>
  );
}
