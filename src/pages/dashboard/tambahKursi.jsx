import React, { useEffect, useState } from "react";
import { Breadcrumb } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import FormInput from "elements/form/input/input";
import { ReactComponent as IconSupir } from "assets/icons/healthicons_truck-driver.svg";
import Buttons from "elements/form/button/button";
import {
  createNewPesanan,
  getScheduleDetail,
  getSeatsByCar,
} from "service/api";
import SeatInput from "elements/form/seatInput/seatInput";
import SwitchInput from "elements/form/switchInput/switchInput";
import FormSelect from "elements/form/select/select";
import Swal from "sweetalert2";

export default function TambahKursi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState();
  const [location, setLoacation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [carId, setCarId] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [data, setData] = useState({
    jadwal_id: "",
    titik_jemput_id: "",
    titik_antar_id: "",
    nama: "",
    nik: "",
    email: "",
    no_telp: "",
    penumpang: [],
  });
  const [copyToPassenger, setCopyToPassenger] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("contactDetails");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const fetchSeatCars = async (id) => {
    try {
      const response = await getSeatsByCar(id);

      setSeats(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScheduleDetail(id);
  }, [id]);

  useEffect(() => {
    if (carId) {
      fetchSeatCars(carId);
    }
  }, [carId]);

  const fetchScheduleDetail = async (id) => {
    try {
      const response = await getScheduleDetail(id);

      setLoacation(response?.data);
      setCarId(response?.data?.mobil_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewPesanan = async () => {
    try {
      setIsLoading(true);

      const payload = {
        ...data,
        jadwal_id: id,
        penumpang: selectedSeats.map((seatId) => ({
          ...data.penumpang.find((p) => p.no_kursi === seatId),
        })),
      };

      const response = await createNewPesanan(payload);

      console.log(response, "ini res");

      if (response.success === true) {
        setIsLoading(false);
        localStorage.clear();
        Swal.fire({
          icon: "success",
          title: "Berhasil membuat pesanan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate(`/pesanan/pembayaran/${response?.data?.kode_pesanan}`);
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

  const handleSeatChange = (seat) => {
    if (seat.status !== "terisi") {
      setSelectedSeats((prev) =>
        prev.includes(seat.id)
          ? prev.filter((num) => num !== seat.id)
          : [...prev, seat.id]
      );
    }
  };

  const handleSwitchChange = () => {
    setCopyToPassenger((prev) => !prev);
    if (!copyToPassenger) {
      const updatedPassengers = selectedSeats.map((seatId) => ({
        nama: data.nama,
        nik: data.nik,
        email: data.email,
        no_telp: data.no_telp,
        no_kursi: seatId,
      }));
      setData((prev) => ({ ...prev, penumpang: updatedPassengers }));
    } else {
      // Clear passenger data if switch is off
      setData((prev) => ({
        ...prev,
        penumpang: prev.penumpang.map((p) => ({
          ...p,
          nama: "",
          nik: "",
          email: "",
          no_telp: "",
        })),
      }));
    }
  };

  const handlePassengerInputChange = (index, field, value) => {
    const updatedPenumpang = [...data.penumpang];
    updatedPenumpang[index] = {
      ...updatedPenumpang[index],
      [field]: value,
    };
    setData((prev) => ({ ...prev, penumpang: updatedPenumpang }));
  };

  const renderSeat = (seatNumber) => {
    const seat = seats?.find((s) => s?.nomor_kursi === seatNumber);
    if (!seat) return <div className="flex items-center px-5 py-3"></div>;
    return (
      <SeatInput
        key={seat.id}
        seat={seat}
        onChange={handleSeatChange}
        isSelected={selectedSeats.includes(seat.id)}
      />
    );
  };

  const renderFormInputs = (seatId, index) => (
    <div
      key={seatId}
      className="flex flex-col w-full bg-neutral-50 pb-8 rounded-md shadow-md p-4 gap-y-4">
      <h3 className="text-[18px] font-semibold text-neutral-700">
        Detail Penumpang {index + 1}
      </h3>

      <div className="flex flex-col w-full gap-y-4">
        <div className="grid grid-cols-2 w-full gap-x-5">
          <div className="flex flex-col w-full gap-y-3">
            <FormInput
              type="text"
              placeholder="Nama"
              className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
              id={`nama-${seatId}`}
              name={`nama-${seatId}`}
              value={data.penumpang[index]?.nama || ""}
              onChange={(e) =>
                handlePassengerInputChange(index, "nama", e.target.value)
              }
              htmlFor={`nama-${seatId}`}
              label="Nama"
              classLabel="w-full"
            />
          </div>

          <div className="flex flex-col w-full gap-y-3">
            <FormInput
              type="text"
              placeholder="NIK"
              className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
              id={`nik-${seatId}`}
              name={`nik-${seatId}`}
              value={data.penumpang[index]?.nik || ""}
              onChange={(e) =>
                handlePassengerInputChange(index, "nik", e.target.value)
              }
              htmlFor={`nik-${seatId}`}
              label="NIK"
              classLabel="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 w-full gap-x-5">
          <div className="flex flex-col w-full gap-y-3">
            <FormInput
              type="text"
              placeholder="Email"
              className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
              id={`email-${seatId}`}
              name={`email-${seatId}`}
              value={data.penumpang[index]?.email || ""}
              onChange={(e) =>
                handlePassengerInputChange(index, "email", e.target.value)
              }
              htmlFor={`email-${seatId}`}
              label="Email"
              classLabel="w-full"
            />
          </div>

          <div className="flex flex-col w-full gap-y-3">
            <FormInput
              type="text"
              placeholder="Nomor Telepon"
              className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
              id={`telepon-${seatId}`}
              name={`telepon-${seatId}`}
              value={data.penumpang[index]?.no_telp || ""}
              onChange={(e) =>
                handlePassengerInputChange(index, "no_telp", e.target.value)
              }
              htmlFor={`telepon-${seatId}`}
              label="Telepon"
              classLabel="w-full"
            />
          </div>
        </div>

        <div className="flex flex-row w-full gap-x-5">
          <div className="flex flex-col w-full gap-y-3">
            <FormInput
              type="number"
              placeholder="Nomor Kursi"
              className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
              id={`nomor-kursi-${seatId}`}
              name={`telepon_kursi-${seatId}`}
              value={seatId}
              // value={data.penumpang[index]?.no_kursi || ""}
              onChange={(e) => {
                const updatedPenumpang = [...data.penumpang];
                updatedPenumpang[index] = {
                  ...updatedPenumpang[index],
                  no_kursi: e.target.value,
                };
                setData((prev) => ({ ...prev, penumpang: updatedPenumpang }));
              }}
              htmlFor={`nomor-kursi-${seatId}`}
              label="Nomor Kursi"
              classLabel="w-full"
            />
          </div>

          {index === 0 && (
            <div className="flex flex-row justify-end items-center pt-6 w-full gap-y-3 gap-x-3">
              <p>Sama dengan pemesan</p>
              <SwitchInput
                checked={copyToPassenger}
                onChange={handleSwitchChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <Link to="/" className="flex pr-3 items-center text-[#0705EC]">
          <p>Pesanan</p>
        </Link>
        <ChevronRight className="w-5 h-5 mr-3" />
        <Link
          to="/pesanan/tambah"
          className="flex pr-3 items-center text-[#0705EC]">
          <p>Tambah Pesanan</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3 text-[16px]">Tambah Kursi</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col w-full bg-neutral-50 mt-10 gap-y-5">
        <div className="flex flex-row w-full gap-x-3">
          <div className="flex flex-col w-full gap-y-3">
            <div className="grid grid-cols-2 w-full gap-x-4">
              <FormSelect
                data={location?.titik_antar}
                change={(value) => setData({ ...data, titik_antar_id: value })}
                htmlFor="titik-antar"
                label="Titik Antar"
                classLabel="w-full font-semibold text-neutral-700 text-[16px]"
                name="titik_antar_id"
                value={data?.titik_antar_id}
              />

              <FormSelect
                data={location?.titik_jemput}
                change={(value) => setData({ ...data, titik_jemput_id: value })}
                htmlFor="titik_jemput"
                label="Titik Jemput"
                classLabel="w-full font-semibold text-neutral-700 text-[16px]"
                name="titi_jemput_id"
                value={data?.titik_jemput_id}
              />
            </div>

            <div className="flex flex-col w-full bg-neutral-50 rounded-md shadow-md p-4 gap-y-4 pb-8">
              <h3 className="text-[18px] font-semibold text-neutral-700">
                Kotak Pemesan
              </h3>

              <div className="flex flex-col w-full gap-y-4">
                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Nama"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="data-nama"
                    name="nama"
                    value={data?.nama}
                    onChange={(e) => setData({ ...data, nama: e.target.value })}
                    htmlFor="data-nama"
                    label="Nama"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="NIK"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="data-nik"
                    name="nik"
                    value={data?.nik}
                    onChange={(e) => setData({ ...data, nik: e.target.value })}
                    htmlFor="data-nik"
                    label="NIK"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Email"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="data-email"
                    name="email"
                    value={data?.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    htmlFor="data-email"
                    label="Email"
                    classLabel="w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-3">
                  <FormInput
                    type="text"
                    placeholder="Nomor Telepon"
                    className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                    id="data-telepon"
                    name="no_telp"
                    value={data?.no_telp}
                    onChange={(e) =>
                      setData({ ...data, no_telp: e.target.value })
                    }
                    htmlFor="data-telepon"
                    label="Telepon"
                    classLabel="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-6/12 bg-neutral-50 pb-8 rounded-md shadow-md p-4 gap-y-4">
            <h3 className="text-[18px] font-semibold text-neutral-700">
              Pilih Kursi
            </h3>

            <div className="flex flex-row w-full">
              <div className="flex flex-row w-full gap-x-4">
                <div className="bg-textSecondary px-3 py-0.5"></div>

                <p>Terisi</p>
              </div>

              <div className="flex flex-row w-full gap-x-4">
                <div className="bg-main px-3 py-0.5"></div>

                <p>Kosong</p>
              </div>

              <div className="flex flex-row w-full gap-x-4">
                <div className="bg-secondary px-3 py-0.5"></div>

                <p>Dipilih</p>
              </div>
            </div>

            <div className="flex flex-row w-full gap-x-3 mt-10">
              <div className="flex items-center border border-textSecondary">
                <p className="-rotate-90">Pintu</p>
              </div>

              <div className="flex flex-col w-full gap-y-3 ml-6 mr-8">
                <div className="flex flex-row w-full justify-between">
                  {renderSeat(1)}

                  <div className="px-3 py-1">
                    <IconSupir fill="#0705EC" className="w-10 h-10" />
                  </div>
                </div>

                <div className="flex flex-row w-full gap-0.5 justify-end">
                  {renderSeat(4)}
                  {renderSeat(3)}
                  {renderSeat(2)}
                </div>

                <div className="grid grid-cols-4 w-full gap-0.5">
                  {renderSeat(7)}
                  <div className="flex items-center px-5 py-3"></div>
                  {renderSeat(6)}
                  {renderSeat(5)}
                </div>

                <div className="grid grid-cols-4 w-full gap-0.5">
                  {renderSeat(10)}
                  <div className="flex items-center px-5 py-3"></div>
                  {renderSeat(9)}
                  {renderSeat(8)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedSeats.map((seatId, index) => renderFormInputs(seatId, index))}

        <div className="flex justify-end">
          <Buttons
            isLoading={isLoading}
            disables={isLoading ? true : false}
            type="submit"
            className="w-3/12 bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
            name="Lanjut"
            onClick={handleNewPesanan}
          />
        </div>
      </div>
    </section>
  );
}
