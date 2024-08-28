import React, { useEffect, useRef, useState } from "react";
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
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import Buttons from "elements/form/button/button";
import { createNewDestination } from "service/api";
import Swal from "sweetalert2";

export default function NewDestinationArticle() {
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill();
  const dropRef = useRef(null);
  const [data, setData] = useState({
    judul: "",
    konten: "",
    image_url: "",
    lokasi: "",
    sub_judul: "",
  });
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setData((prevData) => ({
          ...prevData,
          konten: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setData({
        ...data,
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
      setData({
        ...data,
        image_url: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setFileImage(null);
    setPreviewImage("");
    setData({ ...data, image_url: "" });
  };

  const handleNewDestination = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", data.judul);
    formData.append("konten", data.konten);
    formData.append("sub_judul", data.sub_judul);
    formData.append("lokasi", data.lokasi);
    if (fileImage) {
      formData.append("image_url", fileImage);
    }

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}` + `ini data`);
    // });

    try {
      setIsLoading(true);
      const response = await createNewDestination(formData);

      // console.log(response, "ini res");

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan Article Wisata!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/article/article-destination");
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
            <BreadcrumbLink href="/article/article-destination">
              Artikel Pariwisata
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Artikel Pariwisata</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white mt-10 rounded-md p-4">
        <form onSubmit={handleNewDestination}>
          <div className="flex flex-col w-full gap-y-5">
            <div className="flex flex-col w-full gap-y-3">
              <FormInput
                type="text"
                placeholder="Judul Artikel"
                className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                id="judul-artikel"
                name="judul"
                value={data?.judul}
                onChange={(e) => setData({ ...data, judul: e.target.value })}
                htmlFor="judul-artikel"
                label="Judul Artikel"
                classLabel="w-full text-[16px] text-neutral-700 font-normal"
              />
            </div>

            <div className="flex flex-col w-full gap-y-3">
              <FormInput
                type="text"
                placeholder="Sub Judul Artikel"
                className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                id="sub-judul-artikel"
                name="sub_judul"
                value={data?.sub_judul}
                onChange={(e) =>
                  setData({ ...data, sub_judul: e.target.value })
                }
                htmlFor="sub-judul-artikel"
                label="Sub Judul Artikel"
                classLabel="w-full text-[16px] text-neutral-700 font-normal"
              />
            </div>

            <div className="flex flex-col w-full gap-y-3">
              <FormInput
                type="text"
                placeholder="Lokasi"
                className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                id="lokasi"
                name="lokasi"
                value={data?.lokasi}
                onChange={(e) => setData({ ...data, lokasi: e.target.value })}
                htmlFor="lokasi"
                label="Lokasi"
                classLabel="w-full text-[16px] text-neutral-700 font-normal"
              />
              <div className="text-neutral-700 text-[16px]">
                Deskripsi Konten
              </div>
            </div>

            <div
              className="flex flex-col h-[300px] w-ful border border-textSecondary"
              ref={quillRef}></div>

            <div className="flex flex-col w-full">
              <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                Foto Artikel
              </Label>

              <div className="flex flex-col md:flex-row w-full">
                <div
                  ref={dropRef}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDropImage}
                  className={`w-full ${
                    data?.image_url || previewImage ? "md:w-8/12" : "w-full"
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

                {(previewImage || data?.image_url) && (
                  <div className="relative md:ml-4 w-full mt-1">
                    <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                      <img
                        src={previewImage || data?.image_url}
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
