import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Swal from "sweetalert2";
import FormLabel from "elements/form/label/label";
import FormInput from "elements/form/input/input";
import FormSelect from "elements/form/select/select";
import { getAllMasterTravelCarRent } from "service/api";
import { Input } from "@/components/ui/input";
import { Check, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormTextArea from "elements/form/text-area/text-area";

export default function OrderPenginapan() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nik: "",
    no_telp: "",
    alamat: "",
    area: "",
    durasi_sewa: "",
    tanggal_mulai_sewa: "",
    tanggal_akhir_sewa: "",
    alamat_keberangkatan: "",
    mobil_rental_id: "",
    jam_keberangkatan: "",
    all_in: "",
  });
  const [cars, setCars] = useState([]);
  const [biayaSewa, setBiayaSewa] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const fetchAllCars = async () => {
    try {
      const response = await getAllMasterTravelCarRent();

      setCars(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  const changeSelect = (value) => {
    const selectedCar = cars.find((car) => car.id.toString() === value);
    setForm({ ...form, mobil_rental_id: value });

    if (selectedCar) {
      setBiayaSewa(selectedCar.biaya_sewa);
    }
  };

  const changeSelectArea = (value) => {
    setForm({ ...form, area: value });
  };

  useEffect(() => {
    if (
      localStorage.getItem("nama") ||
      localStorage.getItem("email") ||
      localStorage.getItem("nik") ||
      localStorage.getItem("no_telp") ||
      localStorage.getItem("alamat") ||
      localStorage.getItem("area") ||
      localStorage.getItem("durasi_sewa") ||
      localStorage.getItem("tanggal_mulai_sewa") ||
      localStorage.getItem("tanggal_akhir_sewa") ||
      localStorage.getItem("alamat_keberangkatan") ||
      localStorage.getItem("mobil_rental_id") ||
      localStorage.getItem("jam_keberangkatan") ||
      localStorage.getItem("all_in")
    ) {
      let value = localStorage.getItem("all_in");
      let valueAllIn;
      if (value === "true") {
        valueAllIn = true;
      } else if (value === "false") {
        valueAllIn = false;
      }

      setForm({
        nama: localStorage.getItem("nama"),
        email: localStorage.getItem("email"),
        nik: localStorage.getItem("nik"),
        no_telp: localStorage.getItem("no_telp"),
        alamat: localStorage.getItem("alamat"),
        area: localStorage.getItem("area"),
        durasi_sewa: localStorage.getItem("durasi_sewa"),
        tanggal_mulai_sewa: localStorage.getItem("tanggal_mulai_sewa"),
        tanggal_akhir_sewa: localStorage.getItem("tanggal_akhir_sewa"),
        alamat_keberangkatan: localStorage.getItem("alamat_keberangkatan"),
        mobil_rental_id: localStorage.getItem("mobil_rental_id"),
        jam_keberangkatan: localStorage.getItem("jam_keberangkatan"),
        all_in: valueAllIn,
      });
    }
  }, [localStorage]);

  const handleNewPackage = () => {
    Object.keys(form).forEach((key) => {
      localStorage.setItem(key, form[key]);
    });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/travel-car-rent/order-travel-car-rent/payment");
    }, 2000);
  };

  const handleCheckboxChange = () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    setForm({ ...form, all_in: updatedChecked });
  };

  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/hostel">Pesanan Penginapan</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Order Penginapan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white p-5 mt-8 rounded-lg">
        <div className="flex flex-col w-full gap-y-6">
          <div className="w-full flex flex-col gap-y-3">
            <h3 className="font-semibold text-[18px] text-neutral-700">
              Detail Informasi Penyewa
            </h3>

            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="nama"
                  name="nama"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  htmlFor="nama"
                  label="Nama Lengkap"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="NIK"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="nik"
                  name="nik"
                  value={form.nik}
                  onChange={(e) => setForm({ ...form, nik: e.target.value })}
                  htmlFor="nik"
                  label="NIK"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="email"
                  placeholder="Email"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  htmlFor="email"
                  label="Email"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Nomor Telepon"
                  className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="no_telp"
                  name="no_telp"
                  value={form.no_telp}
                  onChange={(e) =>
                    setForm({ ...form, no_telp: e.target.value })
                  }
                  htmlFor="no_telp"
                  label="Nomor Telepon"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full gap-6">
              <div className="w-full flex flex-col gap-y-3">
                <FormLabel name="Alamat" className="w-full" />

                <div className="flex flex-col w-full gap-y-3">
                  <FormTextArea
                    name="alamat"
                    id="alamat"
                    value={form.alamat}
                    onChange={(e) =>
                      setForm({ ...form, alamat: e.target.value })
                    }
                    placeholder="Alamat"
                    className="w-full h-[150px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-3">
            <h3 className="font-semibold text-[18px] text-neutral-700">
              Detail Sewa Penginapan
            </h3>

            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormSelect
                  data={cars}
                  change={changeSelect}
                  htmlFor="mobil"
                  label="Mobil"
                  classLabel="w-full"
                  name="mobil_rental_id"
                  value={form?.mobil_rental_id}
                />
              </div>

              {/* <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="area"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="area"
                  name="area"
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  htmlFor="area"
                  label="Area"
                  classLabel="w-full"
                />
              </div> */}
              <div className="flex flex-col w-full gap-y-3">
                <FormSelect
                  data={[
                    { id: "dalam kota", nama: "Dalam Kota" },
                    { id: "luar kota", nama: "Luar Kota" },
                  ]}
                  change={changeSelectArea}
                  htmlFor="area"
                  label="Area"
                  classLabel="w-full"
                  name="area"
                  value={form?.area}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="date"
                  placeholder="Tanggal Mulai Sewa"
                  className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="tanggal_mulai_sewa"
                  name="tanggal_mulai_sewa"
                  value={form.tanggal_mulai_sewa}
                  onChange={(e) =>
                    setForm({ ...form, tanggal_mulai_sewa: e.target.value })
                  }
                  htmlFor="tanggal_mulai_sewa"
                  label="Tanggal Mulai Sewa"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="date"
                  placeholder="Tanggal Akhir Sewa"
                  className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="tanggal_akhir_sewa"
                  name="tanggal_mulai_sewa"
                  value={form.tanggal_akhir_sewa}
                  onChange={(e) =>
                    setForm({ ...form, tanggal_akhir_sewa: e.target.value })
                  }
                  htmlFor="tanggal_mulai_sewa"
                  label="Tanggal Akhir Sewa"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Durasi Sewa"
                  className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="durasi_sewa"
                  name="durasi_sewa"
                  value={form.durasi_sewa}
                  onChange={(e) =>
                    setForm({ ...form, durasi_sewa: e.target.value })
                  }
                  htmlFor="durasi_sewa"
                  label="Durasi Sewa"
                  classLabel="w-full"
                />
              </div>

              {/* <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="time"
                  placeholder="Jam Keberangakatan"
                  className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="jam_keberangkatan"
                  name="jam_keberangkatan"
                  value={form.jam_keberangkatan}
                  onChange={(e) =>
                    setForm({ ...form, jam_keberangkatan: e.target.value })
                  }
                  htmlFor="jam_keberangkatan"
                  label="Jam Keberangkatan"
                  classLabel="w-full"
                />
              </div> */}
            </div>

            {/* <div className="flex flex-row w-full gap-6">
              <div className="w-full flex flex-col gap-y-3">
                <FormLabel name="Alamat Keberangkatan" className="w-full" />

                <div className="flex flex-col w-full gap-y-3">
                  <FormTextArea
                    name="alamat_keberangkatan"
                    id="alamat_keberangkatan"
                    value={form.alamat_keberangkatan}
                    onChange={(e) =>
                      setForm({ ...form, alamat_keberangkatan: e.target.value })
                    }
                    placeholder="Alamat Keberangkatan"
                    className="w-full h-[150px]"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center w-6/12 gap-y-3">
                <input
                  type="checkbox"
                  id="all-in"
                  name="all_in"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="hidden"
                />
                <label
                  htmlFor="all-in"
                  className="flex items-center cursor-pointer select-none">
                  <span
                    className={`w-5 h-5 rounded-full inline-block mr-2 border ${
                      form.all_in
                        ? "bg-green-500 border-green-500 text-neutral-50 flex items-center justify-center"
                        : "bg-neutral-300 border-neutral-300 flex items-center justify-center"
                    }`}>
                    {form.all_in ? (
                      <Check
                        size={16}
                        strokeWidth={3}
                        className="text-neutral-50"
                      />
                    ) : (
                      <Check
                        size={16}
                        strokeWidth={3}
                        className="text-neutral-50"
                      />
                    )}
                  </span>
                  <strong>ALL IN</strong> (Biaya Tol, Kapal dan BBM)
                </label>
              </div>
            </div> */}
          </div>

          <div className="flex flex-col justify-center w-full gap-y-3">
            <Label className="w-full">Biaya Sewa</Label>

            <div className="w-full border border-outline_border-100 py-3 bg-neutral-200 rounded-md pl-2">
              {biayaSewa !== null && (
                <p className="text-neutral-700">
                  Rp {biayaSewa.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-10 w-full">
          <Button
            onClick={handleNewPackage}
            disabled={isLoading ? true : false}
            className="w-full bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
            name="Pesan">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              "Lanjutkan Pemesanan"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
