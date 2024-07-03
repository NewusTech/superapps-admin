import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Breadcrumb, Checkbox, Label, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';

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
      <div className="bg-white mt-10">
        <form className="p-10">
          <div className="flex w-full gap-10">
            <div className="flex gap-4 flex-col w-full">
              <label className="font-poppins">Nama Supir</label>
              <input
                placeholder="Masukan nama lengkap"
                type="text"
                className="border shadow py-3 px-4 rounded-lg"
              />
            </div>
            <div className="flex gap-4 flex-col w-full">
              <label className="font-poppins">Nomor Telepon</label>
              <input
                placeholder="Masukan nomor telepon"
                type="tel"
                className="border shadow py-3 px-4 rounded-lg"
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
};

export default TambahSupir;
