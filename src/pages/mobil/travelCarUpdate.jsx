import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Buttons from "elements/form/button/button";
import FormInput from "elements/form/input/input";
import FormLabel from "elements/form/label/label";
import FormTextArea from "elements/form/text-area/text-area";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMobilById, updateTravelCar } from "service/api";
import Swal from "sweetalert2";
import { useQuill } from "react-quilljs";

export default function TravelCarUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill();
  const dropRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [carsForm, setCarsForm] = useState({
    type: "",
    jumlah_kursi: 0,
    fasilitas: "",
    nopol: "",
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setCarsForm((prevData) => ({
          ...prevData,
          fasilitas: quill.root.innerHTML,
        }));
      });
    }

    if (carsForm.fasilitas) {
      quill.clipboard.dangerouslyPasteHTML(carsForm.fasilitas);
    }
  }, [quill, carsForm?.fasilitas]);

  const fetchTraverCar = async (id) => {
    try {
      const response = await getMobilById(id);

      setCarsForm(response?.data);

      if (quill && response?.data?.fasilitas) {
        quill.clipboard.dangerouslyPasteHTML(response.data.fasilitas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTraverCar(id);
  }, [id]);

  const handleUpdateTravelCar = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await updateTravelCar(id, carsForm);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate mobil!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/travel-car");
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
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/travel-car">Mobil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Mobil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-neutral-50 mt-10">
        <form onSubmit={handleUpdateTravelCar} className="p-10">
          <div className="flex flex-col w-full gap-y-6">
            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Tipe Mobil"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="tipe-mobil"
                  name="type"
                  value={carsForm.type}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, type: e.target.value })
                  }
                  htmlFor="tipe-mobil"
                  label="Tipe Mobil"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Jumlah Kursi"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="jumlah-kursi"
                  name="jumlah_kursi"
                  value={carsForm.jumlah_kursi}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, jumlah_kursi: e.target.value })
                  }
                  htmlFor="jumlah-kursi"
                  label="Jumlah Kursi"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Nomor Polisi"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="nopop"
                  name="nopol"
                  value={carsForm.nopol}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, nopol: e.target.value })
                  }
                  htmlFor="nopol"
                  label="Nomor Polisi"
                  classLabel="w-full"
                />
              </div>

              {/* <div className="w-full flex flex-col gap-y-3">
                <FormLabel
                  htmlFor="fasilitas"
                  name="Fasilitas"
                  className="w-full"
                />

                <FormTextArea
                  value={carsForm.fasilitas}
                  name="fasilitas"
                  id="fasilitas"
                  placeholder="Fasilitas"
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, fasilitas: e.target.value })
                  }
                  className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
                />
              </div> */}
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <FormLabel
                htmlFor="fasilitas"
                name="Fasilitas"
                className="w-full"
              />
              <div
                className="flex flex-col h-[300px] w-ful border border-textSecondary"
                ref={quillRef}></div>
            </div>
          </div>

          <div className="pt-10 w-full">
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
