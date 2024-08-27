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
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRuteById, updateRute } from "service/api";
import Swal from "sweetalert2";
import { useQuill } from "react-quilljs";
import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function RouteUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill();
  const dropRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    kota_asal: "",
    kota_tujuan: "",
    harga: "",
    image_url: "",
    deskripsi: "",
  });
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setForm((prevData) => ({
          ...prevData,
          deskripsi: quill.root.innerHTML,
        }));
      });
    }

    if (form?.deskripsi) {
      quill.clipboard.dangerouslyPasteHTML(form?.deskripsi);
    }
  }, [quill, form.deskripsi]);

  const fetchRuteById = async (id) => {
    try {
      const response = await getRuteById(id);

      setForm(response?.data);

      if (quill && response?.data?.deskripsi) {
        quill.clipboard.dangerouslyPasteHTML(response.data.deskripsi);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRuteById(id);
  }, [id]);

  const handleUpdateRute = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("harga", form.harga);
    formData.append("kota_asal", form.kota_asal);
    formData.append("kota_tujuan", form.kota_tujuan);
    formData.append("deskripsi", form.deskripsi);
    if (fileImage) {
      formData.append("image_url", fileImage);
    }

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}` + `ini data`);
    // });

    try {
      setIsLoading(true);

      const response = await updateRute(id, formData);

      // console.log(response, "ini res");

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate rute!",
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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setForm({
        ...form,
        image_url: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDropImage = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileImage(file);
      setForm({
        ...form,
        image_url: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setFileImage(null);
    setPreviewImage("");
    setForm({ ...form, image_url: "" });
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
            <BreadcrumbPage>Update Rute</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-10 mt-10 bg-white">
        <form onSubmit={handleUpdateRute}>
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

            <div className="grid grid-cols-1 gap-x-3">
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

            <div className="grid grid-cols-1 gap-y-3 gap-x-3">
              <div>
                <div className="text-neutral-700 text-[16px]">
                  Deskripsi Rute
                </div>
              </div>

              <div
                className="flex flex-col h-[300px] w-ful border border-textSecondary"
                ref={quillRef}></div>
            </div>

            <div className="flex flex-col w-full">
              <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                Foto Rute
              </Label>

              <div className="flex flex-col md:flex-row w-full">
                <div
                  ref={dropRef}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDropImage}
                  className={`w-full ${
                    form?.image_url || previewImage ? "md:w-8/12" : "w-full"
                  }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                  <>
                    <input
                      type="file"
                      id="file-input-image"
                      name="image_url"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-input-image"
                      className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                      Drag and drop file here or click to select file
                    </label>
                  </>
                </div>

                {(previewImage || form?.image_url) && (
                  <div className="relative md:ml-4 w-full mt-1">
                    <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                      <img
                        src={previewImage || form?.image_url}
                        alt="Preview"
                        className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                        <Trash />
                      </button>
                    </div>
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
              name="Simpan"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
