import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import { Breadcrumb, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import InputSelect from "elements/InputSelect";
import InputText from "elements/InputText";

const TambahTitik = () => {
  return (
    <section className="p-5 min-h-screen">
      <div className="my-5">.</div>
      <Breadcrumb>
        <Link
          to="/titik-lokasi"
          className="flex pr-3 items-center text-[#0705EC]">
          <p>Titik Lokasi</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Titik Lokasi</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white w-full xl:w-1/2">
        <form>
          <div className="grid gap-6">
            <InputSelect label="Cabang" placeholder="Pilih Cabang" />
            <InputText label="Titik Lokasi..." placeholder="Masukan tujuan" />
          </div>
          <div className="pt-10">
            <Button text="Tambah" type="Tambah" height="48" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default TambahTitik;
