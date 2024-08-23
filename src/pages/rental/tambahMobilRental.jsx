import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Buttons from "elements/form/button/button";
import FormInput from "elements/form/input/input";
import { createNewCar } from "service/api";
import Swal from "sweetalert2";
import { useQuill } from "react-quilljs";
import { Label } from "@/components/ui/label";

export default function TambahMobilRentalScreen() {
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill();
  const dropRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [carsForm, setCarsForm] = useState({
    type: "",
    bensin: "",
    desc: "",
    transmisi: "",
    kursi: "",
    mesin: "",
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setCarsForm((prevData) => ({
          ...prevData,
          desc: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  const handleNewCar = async (e) => {
    e.preventDefault();

    console.log(e, "ini e loh");

    // try {
    //   setIsLoading(true);
    //   const response = await createNewCar(carsForm);

    //   if (response.success === true) {
    //     setIsLoading(false);
    //     Swal.fire({
    //       icon: "success",
    //       title: "Berhasil menambahkan mobil!",
    //       timer: 2000,
    //       showConfirmButton: false,
    //       position: "center",
    //     });
    //     navigate("/travel-car");
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: response.message,
    //       timer: 2000,
    //       showConfirmButton: false,
    //       position: "center",
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/travel-car-rent">
              Mobil Rental
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Mobil Rental</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-neutral-50 mt-10">
        <form onSubmit={handleNewCar} className="">
          <div className="flex flex-col w-full gap-y-6">
            <div className="grid grid-cols-1 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Tipe Mobil"
                  className="w-6/12 border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="tipe-mobil"
                  name="type"
                  value={carsForm.car}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, type: e.target.value })
                  }
                  htmlFor="tipe-mobil"
                  label="Tipe Mobil"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <Label className="w-full">Deskripsi</Label>
              <div
                className="flex flex-col h-[300px] w-ful border border-textSecondary"
                ref={quillRef}></div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <h5 className="text-neutral-700 font-normal text-[20px]">
                Spesifikasi
              </h5>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Bensin"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="bensin"
                    name="bensin"
                    value={carsForm.bensin}
                    onChange={(e) =>
                      setCarsForm({ ...carsForm, bensin: e.target.value })
                    }
                    htmlFor="bensin"
                    label="Bensin"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Transmisi"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="transmisi"
                    name="transmisi"
                    value={carsForm.transmisi}
                    onChange={(e) =>
                      setCarsForm({ ...carsForm, transmisi: e.target.value })
                    }
                    htmlFor="transmisi"
                    label="Transmisi"
                    classLabel="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Kursi"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="kursi"
                    name="kursi"
                    value={carsForm.kursi}
                    onChange={(e) =>
                      setCarsForm({ ...carsForm, kursi: e.target.value })
                    }
                    htmlFor="kursi"
                    label="Kursi"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="mesin"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="mesin"
                    name="mesin"
                    value={carsForm.mesin}
                    onChange={(e) =>
                      setCarsForm({ ...carsForm, mesin: e.target.value })
                    }
                    htmlFor="mesin"
                    label="mesin"
                    classLabel="w-full"
                  />
                </div>
              </div>
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
}
