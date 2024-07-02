import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Breadcrumb, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';

const TambahPengguna = () => {
  return (
    <section className="p-5">
      <Breadcrumb>
        <Link to="/pengguna" className="flex pr-3 items-center text-[#0705EC]">
          <p>Pengguna</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Profile</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="pt-16 bg-white">
        <form>
          <div className="flex-wrap flex gap-10">
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Nama Lengkap</label>
              <input
                placeholder="Masukan nama lengkap"
                type="text"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>

            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Email</label>
              <input
                placeholder="Contoh@gmail.com"
                type="text"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Nomor Telepon</label>
              <input
                placeholder="Masukan nomor telepon"
                type="text"
                className="border shadow py-3 px-4 rounded-sm"
              />
            </div>
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Role</label>
              <Select id="role" required>
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Client</option>
              </Select>
            </div>
            <div className="flex gap-4 flex-col w-[45%]">
              <label className="font-poppins">Cabang</label>
              <Select id="Cabang" required>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
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

export default TambahPengguna;
