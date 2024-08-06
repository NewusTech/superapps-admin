import { Breadcrumb } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormSelect from "elements/form/select/select";
import FormTextArea from "elements/form/text-area/text-area";
import FormLabel from "elements/form/label/label";
import Buttons from "elements/form/button/button";

const TambahCabang = () => {
  const [form, setForm] = useState({
    cabang: "",
    alamat: "",
  });

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
      <div className="bg-white w-full mt-10">
        <form className="p-10">
          <div className="grid grid-cols-2 gap-x-3">
            <FormSelect htmlFor="cabang" label="Cabang" classLabel="w-full" />

            <div className="w-full flex flex-col gap-y-3">
              <FormLabel htmlFor="alamat" name="Alamat" className="w-full" />

              <FormTextArea
                value={form.alamat}
                name="alamat"
                id="alamat"
                placeholder="Alamat"
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
              />
            </div>
          </div>

          <div className="pt-8 w-full">
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

export default TambahCabang;
