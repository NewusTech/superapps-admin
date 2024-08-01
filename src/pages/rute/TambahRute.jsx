import Button from 'components/Button';
import { Breadcrumb, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';
import InputText from 'components/InputText';
import InputTime from 'components/InputTime';

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
          <div className="grid grid-cols-2 gap-6">
            <InputText label="Dari" placeholder='Masukan Asal' />
            <InputText label="Ke" placeholder='Masukan Tujuan' />
            <InputTime label="Jam Berangkat" />
            <InputTime label="Jam Berangkat" />
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