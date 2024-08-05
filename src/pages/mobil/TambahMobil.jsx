import SearchInput from "elements/Search";
// import Button from "components/Button";
import { Breadcrumb, Checkbox, Label, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import InputText from "elements/InputText";
import { Button } from "@/components/ui/button";
import FormLabel from "elements/form/label/label";
import FormInputText from "elements/form/input/input";
import { useState } from "react";
import FormTextArea from "elements/form/text-area/text-area";
import Buttons from "elements/form/button/button";

const TambahMobil = () => {
  const [carsForm, setCarsForm] = useState({
    car: "",
    seat: "",
    facilities: "",
  });
  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <Link to="/mobil" className="flex pr-3 items-center text-[#0705EC]">
          <p>Mobil</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Mobil</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white mt-10">
        <form className="p-10">
          <div className="flex flex-col w-full gap-y-6">
            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormLabel
                  htmlFor="tipe-mobil"
                  name="Tipe Mobil"
                  className="w-full"
                />

                <FormInputText
                  type="text"
                  placeholder="Tipe Mobil"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="tipe-mobil"
                  name="tipeMobil"
                  value={carsForm.car}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, car: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormLabel
                  htmlFor="jumlah-kursi"
                  name="Jumlah Kursi"
                  className="w-full"
                />

                <FormInputText
                  type="number"
                  placeholder="Jumlah Kursi"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="jumlah-kursi"
                  name="kursi"
                  value={carsForm.seat}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, seat: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <FormLabel
                htmlFor="fasilitas"
                name="Fasilitas"
                className="w-full"
              />

              <FormTextArea
                value={carsForm.facilities}
                name="fasilitas"
                id="fasilitas"
                placeholder="Fasilitas"
                onChange={(e) =>
                  setCarsForm({ ...carsForm, facilities: e.target.value })
                }
                className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
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

export default TambahMobil;
