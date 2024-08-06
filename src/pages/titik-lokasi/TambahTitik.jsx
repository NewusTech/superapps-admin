import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import { Breadcrumb, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import InputSelect from "elements/InputSelect";
import InputText from "elements/InputText";
import FormSelect from "elements/form/select/select";
import FormTextArea from "elements/form/text-area/text-area";
import FormLabel from "elements/form/label/label";
import { useState } from "react";
import Buttons from "elements/form/button/button";

const TambahTitik = () => {
  const [form, setForm] = useState({
    cabang: "",
    titikLokasi: "",
  });
  return (
    <section className="p-5 min-h-screen">
      <div className="my-5">.</div>
      <Breadcrumb>
        <Link
          to="/titik-lokasi"
          className="flex pr-3 items-center text-[#0705EC]">
          <p>Titik Lokasi</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Titik Lokasi</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white w-full">
        <form>
          <div className="grid grid-cols-2 gap-x-3">
            <FormSelect htmlFor="cabang" label="Cabang" classLabel="w-full" />

            <div className="w-full flex flex-col gap-y-3">
              <FormLabel
                htmlFor="titik"
                name="Titik Lokasi"
                className="w-full"
              />

              <FormTextArea
                value={form.titikLokasi}
                name="titikLokasi"
                id="titik"
                placeholder="Titik Lokasi"
                onChange={(e) =>
                  setForm({ ...form, titikLokasi: e.target.value })
                }
                className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
              />
            </div>
          </div>

          <div className="pt-10">
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

export default TambahTitik;
