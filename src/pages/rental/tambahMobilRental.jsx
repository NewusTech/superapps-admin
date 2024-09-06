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
import Swal from "sweetalert2";
import { useQuill } from "react-quilljs";
import { Label } from "@/components/ui/label";
import { CloudUploadIcon, Trash } from "lucide-react";
import FormLabel from "elements/form/label/label";
import FormTextArea from "elements/form/text-area/text-area";
import { createNewMasterCarRent } from "service/api";

export default function TambahMobilRentalScreen() {
  const navigate = useNavigate();
  const dropRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileImages, setFileImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [carsForm, setCarsForm] = useState({
    type: "",
    nopol: "",
    biaya_sewa: "",
    biaya_all_in: "",
    fasilitas: "",
    deskripsi: "",
    mesin: "",
    transmisi: "",
    bahan_bakar: "",
    jumlah_kursi: "",
    kapasitas_bagasi: "",
    images: [],
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFileImages = [...fileImages, ...files];
    const newPreviewImages = newFileImages.map((file) =>
      URL.createObjectURL(file)
    );

    setFileImages(newFileImages);
    setPreviewImages(newPreviewImages);

    setCarsForm({
      ...carsForm,
      images: newFileImages.map((file) => file.name),
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newFileImages = [...fileImages, ...files];
    const newPreviewImages = newFileImages.map((file) =>
      URL.createObjectURL(file)
    );

    setFileImages(newFileImages);
    setPreviewImages(newPreviewImages);

    setCarsForm({
      ...carsForm,
      images: newFileImages.map((file) => file.name),
    });
  };

  const handleRemoveImage = (index) => {
    const newFileImages = fileImages.filter((_, i) => i !== index);
    const newPreviewImages = previewImages.filter((_, i) => i !== index);

    setFileImages(newFileImages);
    setPreviewImages(newPreviewImages);

    setCarsForm({
      ...carsForm,
      images: newFileImages.map((file) => file.name),
    });
  };

  const handleNewCarRent = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("type", carsForm.type);
    formData.append("nopol", carsForm.nopol);
    formData.append("biaya_sewa", carsForm.biaya_sewa);
    formData.append("biaya_all_in", carsForm.biaya_all_in);
    formData.append("fasilitas", carsForm.fasilitas);
    formData.append("deskripsi", carsForm.deskripsi);
    formData.append("mesin", carsForm.mesin);
    formData.append("transmisi", carsForm.transmisi);
    formData.append("bahan_bakar", carsForm.bahan_bakar);
    formData.append("jumlah_kursi", carsForm.jumlah_kursi);
    formData.append("kapasitas_bagasi", carsForm.kapasitas_bagasi);

    fileImages.forEach((file) => {
      formData.append("images[]", file);
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}` + `ini data`);
    });

    try {
      setIsLoading(true);
      const response = await createNewMasterCarRent(formData);

      console.log(response, "ini res");

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan mobil!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/travel-car-rent/car-master");
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
        <form onSubmit={handleNewCarRent} className="">
          <div className="flex flex-col w-full gap-y-6">
            <div className="grid grid-cols-2 w-full gap-x-5">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Tipe Mobil"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
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

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Nomor Polisi"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="nomor-polisi"
                  name="nopol"
                  value={carsForm.nopol}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, nopol: e.target.value })
                  }
                  htmlFor="nomor-polisi"
                  label="Nomor Polisi"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full gap-x-5">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Biaya Sewa"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="biaya-sewa"
                  name="biaya_sewa"
                  value={carsForm.biaya_sewa}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, biaya_sewa: e.target.value })
                  }
                  htmlFor="biaya-sewa"
                  label="Biaya Sewa"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Biaya All In"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="biaya-all-in"
                  name="biaya_all_in"
                  value={carsForm.biaya_all_in}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, biaya_all_in: e.target.value })
                  }
                  htmlFor="biaya-all-in"
                  label="Biaya All In"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full gap-x-5">
              <div className="w-full flex flex-col gap-y-3">
                <FormLabel
                  htmlFor="fasilitas"
                  name="Fasilitas"
                  className="w-full"
                />
                <FormTextArea
                  value={carsForm.fasilitas}
                  name="fasilitas"
                  id="fasilitas"
                  placeholder="Fasilitas Mobil"
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, fasilitas: e.target.value })
                  }
                  className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full gap-x-5">
              <div className="w-full flex flex-col gap-y-3">
                <FormLabel
                  htmlFor="deskripsi"
                  name="Deskripsi"
                  className="w-full"
                />
                <FormTextArea
                  value={carsForm.deskripsi}
                  name="deskripsi"
                  id="deskripsi"
                  placeholder="Deskripsi Mobil"
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, deskripsi: e.target.value })
                  }
                  className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <h5 className="text-neutral-700 font-normal text-[20px]">
                Spesifikasi
              </h5>

              <div className="grid grid-cols-2 w-full gap-x-5">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Mesin"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="mesin"
                    name="mesin"
                    value={carsForm.mesin}
                    onChange={(e) =>
                      setCarsForm({ ...carsForm, mesin: e.target.value })
                    }
                    htmlFor="mesin"
                    label="Mesin"
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

              <div className="grid grid-cols-2 w-full gap-x-5">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Bahan Bakar"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="bahan-bakar"
                    name="bahan_bakar"
                    value={carsForm.bahan_bakar}
                    onChange={(e) =>
                      setCarsForm({ ...carsForm, bahan_bakar: e.target.value })
                    }
                    htmlFor="bahan-bakar"
                    label="Bahan Bakar"
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

              <div className="grid grid-cols-1 w-full gap-x-5">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="number"
                    placeholder="Kapasitas Bagasi"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="kapasitas-number"
                    name="kapasitas_bagasi"
                    value={carsForm.kapasitas_bagasi}
                    onChange={(e) =>
                      setCarsForm({
                        ...carsForm,
                        kapasitas_bagasi: e.target.value,
                      })
                    }
                    htmlFor="kapasitas-number"
                    label="Kapasitas Bagasi"
                    classLabel="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                Foto Mobil
              </Label>

              <div className="flex flex-col gap-x-5 md:flex-row w-full">
                <div
                  ref={dropRef}
                  onDragOver={handleDragOver}
                  onDrop={handleDropImage}
                  className={`w-full h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center`}>
                  <input
                    type="file"
                    multiple
                    id="file-input-image"
                    name="images"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-input-image"
                    className="text-[16px] flex flex-col items-center gap-y-1 text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                    <CloudUploadIcon className="w-8 h-8" />
                    <span>
                      Drag and drop files here or click to select files
                    </span>
                  </label>
                </div>

                {previewImages.length > 0 && (
                  <div className="grid grid-cols-3 border border-dashed border-outline_border-100 rounded-lg p-2 gap-2 mt-1">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="max-h-32 max-w-full rounded-xl object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-none text-neutral-800 p-1">
                          <Trash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
