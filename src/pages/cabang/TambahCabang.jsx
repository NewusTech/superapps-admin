import { Breadcrumb, Checkbox, Label } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../elements/Button";
import InputText from "elements/InputText";

const TambahCabang = () => {
  return (
    <section className="min-h-screen">
      <div className="my-5">.</div>
      <Breadcrumb>
        <Link to="/cabang" className="flex pr-3 items-center text-[#0705EC]">
          <p>Cabang</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Cabang</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white w-full xl:w-1/2 mt-10">
        <form className="p-10">
          <InputText placeholder="Tambah Cabang" label="Cabang" />
          <div className="pt-8 w-full">
            <Button text="Tambah" type="Tambah" height="48" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default TambahCabang;
