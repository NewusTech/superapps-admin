import SearchInput from "../../components/Search";
import Button from "../../components/Button";
import { Breadcrumb, Checkbox, Label, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import InputText from "components/InputText";

const TambahSupir = () => {
  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <Link to="/supir" className="flex pr-3 items-center text-[#0705EC]">
          <p>Supir</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Supir</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white mt-10 w-full xl:w-1/2">
        <form className="p-10">
          <div className="grid grid-cols-2 gap-6">
            <InputText placeholder="Nama Supir" label={"Nama Supir"} />
            <InputText placeholder="Nomor Telfon" label={"Nomor Telfon"} />
          </div>
          <div className="pt-10 w-full">
            <Button text="Tambah" type="Tambah" className={"w-full"} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default TambahSupir;
