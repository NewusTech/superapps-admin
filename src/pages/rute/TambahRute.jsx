import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";
import FormSelect from "elements/form/select/select";
import FormInput from "elements/form/input/input";
import { useState } from "react";
import Buttons from "elements/form/button/button";

const TambahRute = () => {
  const [form, setForm] = useState({
    dari: "",
    ke: "",
    time: "",
    harga: "",
  });
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
          <div className="w-full flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-x-3">
              <FormSelect htmlFor="dari" label="Dari" classLabel="w-full" />

              <FormSelect htmlFor="ke" label="Ke" classLabel="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-x-3">
              <FormInput
                type="time"
                className="w-full border block border-outlineBorder rounded-md h-[40px] pl-3"
                id="time"
                name="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                label="Waktu Berangkat"
                htmlFor="time"
                placeholder="Waktu Berangkat"
                classLabel="w-full"
              />

              <FormInput
                type="number"
                className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                id="harga"
                name="harga"
                value={form.harga}
                onChange={(e) => setForm({ ...form, harga: e.target.value })}
                label="Harga"
                htmlFor="harga"
                placeholder="Harga"
                classLabel="w-full"
              />
            </div>
          </div>
          <div className="pt-10 w-full">
            <Buttons
              type="submit"
              className="w-full bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
              name="Tambah"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default TambahRute;
