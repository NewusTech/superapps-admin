import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "elements/form/input/input";
import FormSelect from "elements/form/select/select";
import { useEffect, useState } from "react";
import Buttons from "elements/form/button/button";
import {
  getScheduleById,
  getScheduleSelect,
  updateSchedule,
} from "service/api";
import SelectUpdate from "elements/form/select/selectUpdate";
import Swal from "sweetalert2";

export default function ScheduleUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dataSelects, setDataSelects] = useState([]);
  const [carId, setCarId] = useState();
  const [routeId, setRouteId] = useState();
  const [driverId, setDriverId] = useState();
  const [forms, setForms] = useState({
    master_rute_id: "",
    waktu_keberangkatan: "",
    master_mobil_id: "",
    master_supir_id: "",
  });

  const fetchScheduleSelect = async () => {
    try {
      const select = await getScheduleSelect();

      setDataSelects(select?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScheduleSelect();
  }, []);

  const fetchGetScheduleById = async (id) => {
    try {
      const response = await getScheduleById(id);

      setForms(response?.data);
      setCarId(response?.data?.master_mobil_id);
      setRouteId(response?.data?.master_rute_id);
      setDriverId(response?.data?.master_supir_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetScheduleById(id);
  }, [id]);

  const handleScheduleUpdate = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await updateSchedule(id, forms);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate jadwal!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        localStorage.clear();
        navigate("/schedule");
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

  const handleInputChange = (field, value) => {
    setForms((prevForms) => {
      return { ...prevForms, [field]: value };
    });
  };

  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/schedule">Jadwal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Jadwal</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-neutral-50 mt-10">
        <form
          onSubmit={handleScheduleUpdate}
          className="border border-outlineBorder p-4 rounded-md">
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-2 gap-x-4">
              <SelectUpdate
                data={dataSelects.rute}
                htmlFor="rute"
                id="rute"
                selectValue="Pilih Rute"
                label="Rute"
                classLabel="w-full"
                change={(e) =>
                  setForms({ ...forms, master_rute_id: e.target.value })
                }
                name="master_rute_id"
                value={forms?.master_rute_id}
              />

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="time"
                  placeholder="Waktu Berangkat"
                  className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="waktu_berangkat"
                  name="waktu_keberangkatan"
                  value={forms?.waktu_keberangkatan}
                  onChange={(e) =>
                    handleInputChange("waktu_keberangkatan", e.target.value)
                  }
                  htmlFor="waktu_berangkat"
                  label="Waktu Berangkat"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <SelectUpdate
                data={dataSelects?.mobil}
                htmlFor="mobil"
                id="mobil"
                selectValue="Pilih Mobil"
                label="Mobil"
                classLabel="w-full"
                change={(e) =>
                  setForms({ ...forms, master_mobil_id: e.target.value })
                }
                name="master_mobil_id"
                value={forms?.master_mobil_id}
              />

              <SelectUpdate
                data={dataSelects?.supir}
                htmlFor="supir"
                id="supir"
                selectValue="Pilih Sopir"
                label="Sopir"
                classLabel="w-full"
                change={(e) =>
                  setForms({ ...forms, master_supir_id: e.target.value })
                }
                name="master_supir_id"
                value={forms?.master_supir_id}
              />
            </div>
          </div>

          <div className="flex justify-end w-full mt-4">
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
