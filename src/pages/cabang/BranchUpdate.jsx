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
import React, { useEffect, useState } from "react";
import FormLabel from "elements/form/label/label";
import FormInput from "elements/form/input/input";
import FormTextArea from "elements/form/text-area/text-area";
import Buttons from "elements/form/button/button";
import { getCabangById, UpdateCabang } from "service/api";
import Swal from "sweetalert2";

export default function BranchUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
  });

  const fetchBranchById = async (id) => {
    try {
      const response = await getCabangById(id);

      setForm(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBranchById(id);
  }, [id]);

  const handleUpdateBranch = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await UpdateCabang(id, form);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate cabang!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/branch");
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
    <section className="min-h-screen mt-16">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/branch">Cabang</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Cabang</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white w-full mt-10">
        <form onSubmit={handleUpdateBranch} className="p-10">
          <div className="grid grid-cols-2 gap-x-3">
            <FormInput
              type="text"
              className="w-full border block border-outlineBorder rounded-md h-[40px] pl-3"
              id="nama-cabang"
              name="nama"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              label="Nama Cabang"
              htmlFor="nama-cabang"
              placeholder="Nama Cabang"
              classLabel="w-full"
            />

            <div className="w-full flex flex-col gap-y-3">
              <FormLabel htmlFor="alamat" name="Alamat" className="w-full" />

              <FormTextArea
                value={form.alamat}
                name="alamat"
                id="alamat"
                placeholder="Alamat"
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
              />
            </div>
          </div>

          <div className="pt-8 w-full">
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
