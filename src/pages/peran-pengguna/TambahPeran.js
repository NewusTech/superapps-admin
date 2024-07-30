import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Breadcrumb, Checkbox, Label, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';

const TambahPeran = () => {
  return (
    <section className="min-h-screen">
      <Breadcrumb>
        <Link to="/peran-pengguna" className="flex pr-3 items-center text-[#0705EC]">
          <p>Pengguna</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Pengguna</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white w-1/2 mt-10">
        <form className="p-10">
          <div className="flex gap-4 flex-col w-full">
            <label className="font-poppins">Role</label>
            <input
              placeholder="Masukan nama lengkap"
              type="text"
              className="border shadow py-3 px-4 rounded-sm"
            />
          </div>
          <div className="flex gap-10 pt-10">
            <div className="flex items-center gap-2">
              <Checkbox id="create" />
              <Label htmlFor="create">Create</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="update" />
              <Label htmlFor="update">Update</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="read" />
              <Label htmlFor="read">Read</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="delete" />
              <Label htmlFor="delete">Delete</Label>
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

export default TambahPeran;
