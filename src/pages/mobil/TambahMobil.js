import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Breadcrumb, Checkbox, Label, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';

const TambahMobil = () => {
  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <Link to="/supir" className="flex pr-3 items-center text-[#0705EC]">
          <p>Mobil</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Mobil</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white mt-10">
        <form className="p-10">
          <div className="flex flex-wrap w-full gap-10">
            <div className="flex gap-4 flex-col w-[48%]">
              <label className="font-poppins">Tipe Mobil</label>
              <input
                placeholder="Masukan inputan"
                type="text"
                className="border shadow py-3 px-4 rounded-lg"
              />
            </div>
            <div className="flex gap-4 flex-col w-[48%]">
              <label className="font-poppins">Jumlah Kursi</label>
              <input
                placeholder="Masukan inputan"
                type="number"
                className="border shadow py-3 px-4 rounded-lg"
              />
            </div>
            <div className="flex gap-4 flex-col w-[48%]">
              <label className="font-poppins">Fasilitas</label>
              <input
                placeholder="Masukan inputan"
                type="text"
                className="border shadow py-3 px-4 rounded-lg"
              />
            </div>
            <div className="flex gap-4 flex-col w-[48%]">
              <label className="font-poppins">Upload Gambar</label>
              <input
                placeholder="Masukan gambar denah mobil / denah kursi "
                type="file"
                multiple={true}
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

export default TambahMobil;
