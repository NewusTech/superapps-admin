import Button from "../../elements/Button";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function TambahPesananNO() {
  return (
    <section className="p-5 min-h-screen">
      <Breadcrumb>
        <Link to="/" className="flex pr-3 items-center text-[#0705EC]">
          <p>Rute</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Pesanan</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white">
        <form>
          <div className="flex-wrap flex gap-10">
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Nama</label>
              <input
                placeholder="Masukan Nama"
                type="text"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>

            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Nomor Telepon</label>
              <input
                placeholder="Masukan tujuan"
                type="text"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Kursi</label>
              <select
                name="kursi_id"
                id="kursi"
                className="border shadow py-3 px-4 rounded-sm">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Harga</label>
              <input
                placeholder="Masukan harga"
                type="number"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>
          </div>
          <div className="pt-10 w-full">
            <Button text="Tambah" type="Tambah" height="48" />
          </div>
        </form>
      </div>
    </section>
  );
}
