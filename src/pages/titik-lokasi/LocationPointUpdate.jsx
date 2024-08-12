import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Buttons from "elements/form/button/button";
import FormTextArea from "elements/form/text-area/text-area";
import FormLabel from "elements/form/label/label";
import FormSelect from "elements/form/select/select";
import {
  getAllCabang,
  getTitikLokasiByid,
  updateTitikLokasi,
} from "service/api";
import SelectUpdate from "elements/form/select/selectUpdate";
import Swal from "sweetalert2";

export default function LocationPointUpdate() {
  const { id } = useParams();
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

  const fetchLocationPoint = async (id) => {
    try {
      const response = await getTitikLokasiByid(id);

      setForm(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocationPoint(id);
  }, [id]);

  const handleUpdateLocationPoint = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await updateTitikLokasi(id, form);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate Titik Lokasi!",
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

  return (
    <section className="p-5 min-h-screen mt-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/location-point">Titik Lokasi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Titik Lokasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white w-full">
        <form onSubmit={handleUpdateLocationPoint}>
          <div className="grid grid-cols-2 gap-x-3">
            <SelectUpdate
              data={cabangs}
              htmlFor="cabang"
              id="cabang"
              selectValue="Pilih Cabang"
              label="Cabang"
              classLabel="w-full"
              change={(e) =>
                setForm({ ...form, master_cabang_id: e.target.value })
              }
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
              name="Simpan"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
