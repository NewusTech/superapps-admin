import Button from "elements/Button";
import InputDate from "elements/InputDate";
import InputText from "elements/InputText";
import InputTextArea from "elements/InputTextArea";
import React, { useState } from "react";

export default function TambahPaket() {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div className="my-5">.</div>
      <div className="bg-white p-5">
        <div className="grid grid-cols-2 gap-6">
          <InputText label={"Nama Pengirim"} placeholder="Nama Pengirim" />
          <InputText label={"Nama Penerima"} placeholder="Nama Penerima" />
          <InputTextArea
            label={"Alamat Pengirima"}
            placeholder="Alamat Pengirima"
            className={"h-24"}
          />
          <InputTextArea
            label={"Alamat Pengirim"}
            placeholder="Alamat Pengirim"
            className={"h-24"}
          />
          <InputDate label={"Tanggal Dikirim"} selectedDate={date} />
          <InputDate label={"Tanggal Diterima"} selectedDate={date} />
          <InputText label={"Jenis Paket"} placeholder="Jenis Paket" />
          <InputText label={"Biaya"} placeholder="Biaya" />
          <InputText label={"Total Berat"} placeholder="Total Berat" />
        </div>
        <Button text={"Pesan"} className={"w-full my-8"} />
      </div>
    </>
  );
}
