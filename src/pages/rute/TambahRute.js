import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Breadcrumb, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';

const TambahRute = () => {
  return (
    <section className="p-5 min-h-screen">
      <Breadcrumb>
        <Link to="/rute" className="flex pr-3 items-center text-[#0705EC]">
          <p>Rute</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Rute</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white">
        <form>
          <div className="flex-wrap flex gap-10">
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Dari</label>
              <input
                placeholder="Masukan asal"
                type="text"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>

            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Ke...</label>
              <input
                placeholder="Masukan tujuan"
                type="text"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Jam Berangkat</label>
              <input
                placeholder="Masukan jam berangkat"
                type="datetime-local"
                className="border shadow py-3 px-4 rounded-sm"
              />
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
};

export default TambahRute;
