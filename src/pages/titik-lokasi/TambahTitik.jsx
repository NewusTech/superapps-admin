import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import FormSelect from "elements/form/select/select";
import FormTextArea from "elements/form/text-area/text-area";
import FormLabel from "elements/form/label/label";
import { useEffect, useState } from "react";
import Buttons from "elements/form/button/button";
import { createNewTitikLokasi, getAllCabang } from "service/api";
import Swal from "sweetalert2";

export default function TambahTitik() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    master_cabang_id: "",
  });
  const [cabangs, setCabangs] = useState([]);

  const fetchCabang = async () => {
    try {
      const cabang = await getAllCabang();
      setCabangs(cabang?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCabang();
  }, []);

  const handleNewLocation = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await createNewTitikLokasi(form);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan Titik Lokasi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/location-point");
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

  const changeSelect = (value) => {
    setForm({ ...form, master_cabang_id: value });
  };

  return (
    <section className="p-5 min-h-screen">
      <div className="my-5">.</div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/location-point">Titik Lokasi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Titik Lokasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white w-full">
        <form onSubmit={handleNewLocation}>
          <div className="grid grid-cols-2 gap-x-3">
            <FormSelect
              data={cabangs}
              change={changeSelect}
              htmlFor="cabang"
              label="Cabang"
              classLabel="w-full"
              name="master_cabang_id"
              value={form?.master_cabang_id}
            />

            <div className="w-full flex flex-col gap-y-3">
              <FormLabel
                htmlFor="nama"
                name="Titik Lokasi"
                className="w-full"
              />

              <FormTextArea
                value={form.nama}
                name="nama"
                id="nama"
                placeholder="Titik Lokasi"
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
              />
            </div>
          </div>

          <div className="pt-10">
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
}
