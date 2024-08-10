import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import FormInput from "elements/form/input/input";
import { useState } from "react";
import Buttons from "elements/form/button/button";
import { createNewRute } from "service/api";
import Swal from "sweetalert2";

const TambahRute = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    kota_asal: "",
    kota_tujuan: "",
    waktu_keberangkatan: "",
    harga: "",
  });

  const handleCreateRute = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await createNewRute(form);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan rute!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/route");
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-5 min-h-screen">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/route">Rute</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Rute</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white">
        <form onSubmit={handleCreateRute}>
          <div className="w-full flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-x-3">
              <FormInput
                type="text"
                className="w-full border block border-outlineBorder rounded-md h-[40px] pl-3"
                id="kota-asal"
                name="kota_asal"
                value={form.kota_asal}
                onChange={(e) =>
                  setForm({ ...form, kota_asal: e.target.value })
                }
                label="Dari"
                htmlFor="kota-asal"
                placeholder="Kota Asal"
                classLabel="w-full"
              />

              <FormInput
                type="text"
                className="w-full border block border-outlineBorder rounded-md h-[40px] pl-3"
                id="kota-tujuan"
                name="kota_tujuan"
                value={form.kota_tujuan}
                onChange={(e) =>
                  setForm({ ...form, kota_tujuan: e.target.value })
                }
                label="Ke"
                htmlFor="kota-tujuan"
                placeholder="Kota Tujuan"
                classLabel="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-x-3">
              <FormInput
                type="time"
                className="w-full border block border-outlineBorder rounded-md h-[40px] pl-3"
                id="time"
                name="waktu_keberangkatan"
                value={form.waktu_keberangkatan}
                onChange={(e) =>
                  setForm({ ...form, waktu_keberangkatan: e.target.value })
                }
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
              isLoading={isLoading}
              disables={isLoading ? true : false}
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
