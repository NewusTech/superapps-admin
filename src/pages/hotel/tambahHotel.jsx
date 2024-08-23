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

export default function TambahHotelScreen() {
  const navigate = useNavigate();
  const { quill: quillLokasi, quillRef: quillRefLokasi } = useQuill();
  const { quill: quillTentang, quillRef: quillRefTentang } = useQuill();
  const { quill: quillIsi, quillRef: quillRefIsi } = useQuill();
  const dropRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [carsForm, setCarsForm] = useState({
    name: "",
    lokasi: "",
    tentang: "",
    ac: "",
    kamar_mandi: "",
    judul: "",
    isi: "",
  });

  useEffect(() => {
    if (quillLokasi) {
      quillLokasi.on("text-change", () => {
        setCarsForm((prevData) => ({
          ...prevData,
          lokasi: quill.root.innerHTML,
        }));
      });
    }

    if (quillTentang) {
      quillTentang.on("text-change", () => {
        setCarsForm((prevData) => ({
          ...prevData,
          tentang: quill.root.innerHTML,
        }));
      });
    }

    if (quillIsi) {
      quillIsi.on("text-change", () => {
        setCarsForm((prevData) => ({
          ...prevData,
          isi: quill.root.innerHTML,
        }));
      });
    }
  }, [quillLokasi, quillTentang, quillIsi]);

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
            <BreadcrumbLink href="/hostel/master-hostel">
              Penginapan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Penginapan</BreadcrumbPage>
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
                  placeholder="Nama Penginapan"
                  className="w-6/12 border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="nama-penginapan"
                  name="type"
                  value={carsForm.name}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, name: e.target.value })
                  }
                  htmlFor="nama-penginapan"
                  label="Nama Penginapan"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <Label className="w-full">Lokasi</Label>
              <div
                className="flex flex-col h-[300px] w-ful border border-textSecondary"
                ref={quillRefLokasi}></div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <Label className="w-full">Tentang</Label>
              <div
                className="flex flex-col h-[300px] w-ful border border-textSecondary"
                ref={quillRefTentang}></div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <h5 className="text-neutral-700 font-normal text-[20px]">
                Fasilitas
              </h5>

              <div className="grid grid-cols-2 w-full gap-6">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="ac"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="ac"
                    name="ac"
                    value={carsForm.ac}
                    onChange={(e) =>
                      setCarsForm({ ...carsForm, ac: e.target.value })
                    }
                    htmlFor="ac"
                    label="AC"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Kamar Mandi"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="kamar-mandi"
                    name="kamar_mandi"
                    value={carsForm.kamar_mandi}
                    onChange={(e) =>
                      setCarsForm({ ...carsForm, kamar_mandi: e.target.value })
                    }
                    htmlFor="kamar-mandi"
                    label="Kamar Mandi"
                    classLabel="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <h5 className="text-neutral-700 font-normal text-[20px]">
                Kebijakan
              </h5>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Judul"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="judul"
                  name="judul"
                  value={carsForm.judul}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, judul: e.target.value })
                  }
                  htmlFor="judul"
                  label="Judul"
                  classLabel="w-full"
                />
              </div>

              <div className="w-full flex flex-col gap-y-3">
                <Label className="w-full">Isi</Label>
                <div
                  className="flex flex-col h-[300px] w-ful border border-textSecondary"
                  ref={quillRefIsi}></div>
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
