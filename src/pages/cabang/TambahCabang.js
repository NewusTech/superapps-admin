import { Breadcrumb, Checkbox, Label } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const TambahCabang = () => {
  return (
    <section className="min-h-screen">
      <Breadcrumb>
        <Link to="/cabang" className="flex pr-3 items-center text-[#0705EC]">
          <p>Cabang</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Cabang</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white w-1/2 mt-10">
        <form className="p-10">
          <div className="flex gap-4 flex-col w-full">
            <label className="font-poppins">Cabang</label>
            <input
              placeholder="Tambah Cabang"
              type="text"
              className="border shadow py-3 px-4 rounded-sm"
            />
          </div>
          <div className="pt-8 w-full">
            <Button text="Tambah" type="Tambah" height="48" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default TambahCabang;
