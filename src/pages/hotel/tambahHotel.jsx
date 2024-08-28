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
import {
  createNewCar,
  createNewMasterApartement,
  getMasterDataCreate,
} from "service/api";
import Swal from "sweetalert2";
import { useQuill } from "react-quilljs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

export default function TambahHotelScreen() {
  const navigate = useNavigate();
  const { quill: quillDeskripsi, quillRef: quillRefDeskripsi } = useQuill();
  const dropRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [form, setForm] = useState({
    title: "",
    lokasi: "",
    jumlah_kamar: "",
    luas_ruangan: "",
    rating: "",
    harga: "",
    tipe: "",
    deskripsi: "",
    kebijakan: [],
    fasilitas: [],
    images: [],
  });
  const [fileImages, setFileImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (quillDeskripsi) {
      quillDeskripsi.on("text-change", () => {
        setForm((prevData) => ({
          ...prevData,
          deskripsi: quillDeskripsi.root.innerHTML,
        }));
      });
    }
  }, [quillDeskripsi]);

  const fetchDataCreate = async () => {
    try {
      const response = await getMasterDataCreate();

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataCreate();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFileImages = [...fileImages, ...files];
    const newPreviewImages = newFileImages.map((file) =>
      URL.createObjectURL(file)
    );

    setFileImages(newFileImages);
    setPreviewImages(newPreviewImages);

    setForm({
      ...form,
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

    setForm({
      ...form,
      images: newFileImages.map((file) => file.name),
    });
  };

  const handleRemoveImage = (index) => {
    const newFileImages = fileImages.filter((_, i) => i !== index);
    const newPreviewImages = previewImages.filter((_, i) => i !== index);

    setFileImages(newFileImages);
    setPreviewImages(newPreviewImages);

    setForm({
      ...form,
      images: newFileImages.map((file) => file.name),
    });
  };

  const handleNewMasterPenginapan = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("lokasi", form.lokasi);
    formData.append("jumlah_kamar", form.jumlah_kamar);
    formData.append("luas_ruangan", form.luas_ruangan);
    formData.append("rating", form.rating);
    formData.append("harga", form.harga);
    formData.append("tipe", form.tipe);
    formData.append("deskripsi", form.deskripsi);
    // formData.append("kebijakan", form.kebijakan);
    // formData.append("fasilitas", form.fasilitas);
    // if (fileImages) {
    //   formData.append("image", fileImages);
    // }

    let ArrayValueFasility = [];
    let ArrayValueKebijakan = [];

    form.fasilitas.forEach((item) => {
      ArrayValueFasility.push(item);
    });

    form.kebijakan.forEach((item) => {
      ArrayValueKebijakan.push(item);
    });

    formData.append("kebijakan", JSON.stringify(ArrayValueFasility));
    formData.append("fasilitas", JSON.stringify(ArrayValueKebijakan));

    // console.log(ArrayValueFasility, "ini fasilitas");
    // console.log(ArrayValueKebijakan, "ini kebijakan");

    fileImages.forEach((file) => {
      formData.append("images[]", file);
    });

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}` + `ini data`);
    // });

    try {
      setIsLoading(true);
      const response = await createNewMasterApartement(formData);

      // console.log(response, "ini response");

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan mobil!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/hostel/master-hostel");
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
    <section className="min-h-screen pt-16 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/hostel/master-hostel">
              Master Penginapan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Master Penginapan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-neutral-50 mt-10">
        <form onSubmit={handleNewMasterPenginapan} className="">
          <div className="flex flex-col w-full gap-y-6">
            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Nama Penginapan"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="nama-penginapan"
                  name="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  htmlFor="nama-penginapan"
                  label="Nama Penginapan"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Tipe Penginapan"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="tipe"
                  name="tipe"
                  value={form.tipe}
                  onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                  htmlFor="tipe"
                  label="Tipe Penginapan"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Jumlah Kamar"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="jumlah-kamar"
                  name="jumlah_kamar"
                  value={form.jumlah_kamar}
                  onChange={(e) =>
                    setForm({ ...form, jumlah_kamar: e.target.value })
                  }
                  htmlFor="jumlah-kamar"
                  label="Jumlah Kamar"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Luas Ruangan"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="luas-ruangan"
                  name="luas_ruangan"
                  value={form.luas_ruangan}
                  onChange={(e) =>
                    setForm({ ...form, luas_ruangan: e.target.value })
                  }
                  htmlFor="luas-ruangan"
                  label="Luas Ruangan"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Harga Penginapan"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="harga-penginapan"
                  name="harga"
                  value={form.harga}
                  onChange={(e) => setForm({ ...form, harga: e.target.value })}
                  htmlFor="harga-penginapan"
                  label="Harga Penginapan"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Lokasi"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="lokasi"
                  name="lokasi"
                  value={form.lokasi}
                  onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                  htmlFor="lokasi"
                  label="Lokasi"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <Label htmlFor="rating" className="w-full">
                  Rating
                </Label>

                <div className="w-full flex flex-row gap-x-5">
                  <Input
                    id="rating"
                    name="rating"
                    step="0.1"
                    className="px-0"
                    value={form.rating}
                    onChange={(e) => {
                      setForm({ ...form, rating: e.target.value });
                    }}
                    type="range"
                    min="1"
                    max="5"
                  />

                  <div className="border border-outline_border-100 bg-primary-700 rounded-md px-4 py-2">
                    <p className="font-bold text-neutral-50">{form.rating}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <Label className="w-full">Deskripsi Penginapan</Label>
              <div
                className="flex flex-col h-[300px] w-ful border border-textSecondary"
                ref={quillRefDeskripsi}></div>
            </div>

            <div className="w-full flex flex-col gap-y-5">
              <h5 className="text-neutral-700 font-normal text-[20px]">
                Fasilitas
              </h5>

              <div className="grid grid-cols-5 w-full gap-6">
                {data?.fasilitas?.map((item, i) => {
                  const isChecked = form.fasilitas.includes(item.id);

                  return (
                    <div
                      key={i}
                      className="w-full flex flex-row items-center gap-x-2">
                      <Input
                        type="checkbox"
                        value={item?.id}
                        checked={isChecked}
                        onChange={(e) => {
                          const selectedId = Number(e.target.value);

                          setForm((prevForm) => {
                            const isSelected =
                              prevForm.fasilitas.includes(selectedId);
                            const updatedFasilitas = isSelected
                              ? prevForm.fasilitas.filter(
                                  (id) => id !== selectedId
                                )
                              : [...prevForm.fasilitas, selectedId];

                            return { ...prevForm, fasilitas: updatedFasilitas };
                          });
                        }}
                        className="w-5 h-5"
                      />

                      <Label>{item?.nama}</Label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-5">
              <h5 className="text-neutral-700 font-normal text-[20px]">
                Kebijakan
              </h5>

              <div className="grid grid-cols-5 w-full gap-6">
                {data?.kebijakan?.map((item, i) => {
                  const isChecked = form.kebijakan.includes(item.id);

                  return (
                    <div
                      key={i}
                      className="w-full flex flex-row items-center gap-x-2">
                      <Input
                        type="checkbox"
                        value={item?.id}
                        checked={isChecked}
                        onChange={(e) => {
                          const selectedId = Number(e.target.value);

                          setForm((prevForm) => {
                            const isSelected =
                              prevForm.kebijakan.includes(selectedId);
                            const updatedKebijakan = isSelected
                              ? prevForm.kebijakan.filter(
                                  (id) => id !== selectedId
                                )
                              : [...prevForm.kebijakan, selectedId];

                            return { ...prevForm, kebijakan: updatedKebijakan };
                          });
                        }}
                        className="w-5 h-5"
                      />

                      <Label>{item?.title}</Label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                Foto Penginapan
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
                    className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                    Drag and drop files here or click to select files
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
