import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Breadcrumb, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';

const TambahTitik = () => {
  return (
    <section className="p-5 min-h-screen">
      <Breadcrumb>
        <Link to="/titik-lokasi" className="flex pr-3 items-center text-[#0705EC]">
          <p>Titik Lokasi</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Titik Lokasi</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white w-1/2">
        <form>
          <div className="flex-wrap flex gap-10">
            <div className="flex gap-4 flex-col w-full">
              <label className="font-poppins">Cabang</label>
              <Select id="role" required>
                <option>Pilih Cabang</option>
                <option>Admin</option>
                <option>Client</option>
              </Select>
            </div>

            <div className="flex gap-4 flex-col w-full">
              <label className="font-poppins">Titik Lokasi...</label>
              <input
                placeholder="Masukan tujuan"
                type="text"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>
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
