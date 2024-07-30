import Button from "components/Button";
import InputSelect from "components/InputSelect";
import InputText from "components/InputText";
import React from "react";
import { Link } from "react-router-dom";

export default function TambahPengguna() {
  return (
    <>
      <div className="mt-20">
        <div>
          <Link to={"/pengguna"} className="text-main">
            Pengguna
          </Link>{" "}
          &gt; Tambah Pengguna
        </div>
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