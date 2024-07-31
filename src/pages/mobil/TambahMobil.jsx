import SearchInput from "components/Search";
import Button from "components/Button";
import { Breadcrumb, Checkbox, Label, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import InputText from "components/InputText";

const TambahMobil = () => {
  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <Link to="/mobil" className="flex pr-3 items-center text-[#0705EC]">
          <p>Mobil</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Mobil</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white mt-10">
        <form className="p-10">
          <div className="grid grid-cols-2 w-full gap-6">
            <InputText label={'Tipe Mobil'} placeholder="Tipe Mobil" className={"w-full"} />
            <InputText label={'Jumlah Kursi'} placeholder="Masukan Jumlah Kursi" className={"w-full"} />
            <InputText label={'Fasilitas'} placeholder="Fasilitas" className={"w-full"} />
            <div className="flex flex-1">
              <div className="h-1/2 mt-12">
                <input type="file" id="uploadFile" className="hidden" />
                <label htmlFor="uploadFile">
                  <span className="border underline text-secondary p-2 rounded-md">Upload Image</span>
                  <span className="text-red-500 text-sm ml-5">*Masukan gambar denah mobil / denah kursi</span>
                </label>
              </div>
            </div>
          </div>
          <div className="pt-10 w-full">
            <Button text="Tambah" type="Tambah" height="48" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default TambahMobil;
