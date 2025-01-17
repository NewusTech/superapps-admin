import { Button as Btn } from "@/components/ui/button";
import Button from "elements/Button";
import Buttons from "elements/form/button/button";
import FormInput from "elements/form/input/input";
import FormSelect from "elements/form/select/select";
import Pagination from "elements/pagination/pagination";
import {
  formatDateArrange,
  formatDateInput,
  formatTanggalPanjang,
  formatTime,
} from "helpers";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  createNewSchedule,
  deleteSchedule,
  getAllSchedules,
  getScheduleByDate,
  getScheduleSelect,
} from "service/api";
import Swal from "sweetalert2";

export default function Jadwal() {
  const navigate = useNavigate();
  const [dataSelects, setDataSelects] = useState([]);
  const [Jadwals, setJadwals] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDatas, setIsLoadingDatas] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [forms, setForms] = useState([
    {
      master_rute_id: "",
      waktu_keberangkatan: "",
      master_mobil_id: "",
      master_supir_id: "",
      ketersediaan: "Tersedia",
      tanggal_berangkat: localStorage.getItem("tanggal_berangkat"),
      waktu_tiba: "",
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateButton, setDateButton] = useState(null);
  const [schedules, setSchedules] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getSchedules = async () => {
    setIsLoadingDatas(true);
    try {
      const response = await getAllSchedules();
      setJadwals(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDatas(false);
    }
  };

  useEffect(() => {
    getSchedules();
  }, []);

  const fetchScheduleByDate = async (date) => {
    try {
      const response = await getScheduleByDate(date);
      setSchedule(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScheduleByDate(dateButton);
  }, [dateButton]);

  const fetchScheduleSelect = async () => {
    try {
      const select = await getScheduleSelect();

      setDataSelects(select?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScheduleSelect();
  }, []);

  const handleScheduleUpdate = (id) => {
    navigate(`/schedule/update-schedule/${id}`);
  };

  const handleNewSchedule = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const schedulesToCreate = forms?.map((form) => ({
        ...form,
        tanggal_berangkat: localStorage.getItem("tanggal_berangkat"),
        ketersediaan: "Tersedia",
      }));

      const response = await createNewSchedule(schedulesToCreate);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan jadwal!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        localStorage.clear();
        setSelectedDate(null);
        getSchedules();
        navigate("/schedule");
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

  const handleAddForm = () => {
    setForms((prevForms) => [
      ...prevForms,
      {
        master_rute_id: "",
        waktu_keberangkatan: "",
        master_mobil_id: "",
        master_supir_id: "",
        tanggal_berangkat: "",
        ketersediaan: "",
        waktu_tiba: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setForms((prevForms) => {
      const newForms = [...prevForms];
      newForms[index][field] = value;
      return newForms;
    });
  };

  const handleRemoveForm = (id) => {
    setForms(forms.filter((form, index) => index !== id));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    localStorage.setItem("tanggal_berangkat", formatDateInput(date));
  };

  const handleButtonDateClick = (date) => {
    let getDate = formatDateInput(date);
    setDateButton(getDate);
    localStorage.setItem("dateButton", formatDateInput(date));
  };

  const renderSchedules = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    return schedules[dateKey]?.map((schedule, index) => (
      <div key={index} className="bg-yellow-200 p-1 mt-1 rounded text-xs">
        {schedule}
      </div>
    ));
  };

  const changeMonth = (offset) => {
    if (offset === "today") {
      setCurrentMonth(new Date());
    } else {
      const newMonth = new Date(
        currentMonth.setMonth(currentMonth.getMonth() + offset)
      );
      setCurrentMonth(newMonth);
    }
  };

  const changeYear = (offset) => {
    const newYear = new Date(
      currentMonth.setFullYear(currentMonth.getFullYear() + offset)
    );
    setCurrentMonth(newYear);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const previousMonth = new Date(year, month - 1, 1);
    const nextMonth = new Date(year, month + 1, 1);

    // Days from previous month
    const daysInPrevMonth = daysInMonth(
      previousMonth.getMonth(),
      previousMonth.getFullYear()
    );
    const prevMonthDays = firstDay === 0 ? 6 : firstDay;

    for (
      let day = daysInPrevMonth - prevMonthDays + 1;
      day <= daysInPrevMonth;
      day++
    ) {
      const date = new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth(),
        day
      );
      days.push(
        <div
          key={`prev-${day}`}
          className="w-full px-1 h-20 text-neutral-600 border border-neutral-600 opacity-50">
          <div className="py-2">{day}</div>
        </div>
      );
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth(month, year); day++) {
      const date = new Date(year, month, day);

      const isToday = date.toDateString() === today.toDateString();
      days.push(
        <div
          key={`${day}`}
          className={`border p-2 h-20 cursor-pointer ${
            isToday ? "bg-primary-600 text-neutral-50" : ""
          }`}>
          <div className="py-1" onClick={() => handleDateClick(date)}>
            {day}
          </div>
          <Btn
            onClick={() => handleButtonDateClick(date)}
            className={` ${
              isToday
                ? "bg-white text-neutral-700"
                : "bg-thirtiary-700 text-neutral-50"
            }  rounded-none px-2 w-full h-8`}>
            Cek Jadwal
          </Btn>
          {renderSchedules(date)}
        </div>
      );
    }

    // Days from next month
    const totalDays = days.length;
    const totalCells = 42;
    const nextMonthDays = totalCells - totalDays;

    for (let day = 1; day <= nextMonthDays; day++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
      days.push(
        <div
          key={`next-${day}`}
          className="w-full px-1 h-20 text-neutral-600 border border-neutral-600 opacity-50">
          <div className="py-2">{day}</div>
        </div>
      );
    }

    return days;
  };

  // Determine the current day of the week as a string
  const todayDayOfWeekIndex = today.getDay();
  const todayDayOfWeek = daysOfWeek[(todayDayOfWeekIndex + 7) % 7]; // Adjust to start with Monday

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];
  if (Jadwals) {
    currentItems = Jadwals.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math.ceil(Jadwals.length / itemsPerPage);

  const handleDeleteSchedule = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin menghapus jadwal?",
        text: "Jadwal yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteSchedule(id);

        const date = formatTanggalPanjang(response?.tanggal_berangkat);

        if (response.success === true) {
          await Swal.fire({
            icon: "success",
            title: `Jadwal berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          getSchedules();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col pb-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendar Schedule</h1>
      <div className="flex items-center gap-x-3 h-full bg-neutral-50 p-2 rounded-t-md w-5/12 shadow-md">
        <button
          onClick={() => changeYear(-1)}
          className="text-primary-700 rounded">
          <ChevronsLeft />
        </button>
        <button
          onClick={() => changeMonth(-1)}
          className="text-primary-700 rounded">
          <ChevronLeft />
        </button>
        <button
          onClick={() => changeMonth("today")}
          className="bg-primary-700 text-neutral-50 px-4 py-1 rounded-md">
          Today
        </button>
        <button
          onClick={() => changeMonth(1)}
          className="text-primary-700 rounded">
          <ChevronRight />
        </button>
        <button
          onClick={() => changeYear(1)}
          className="text-primary-700 rounded">
          <ChevronsRight />
        </button>

        <span className="text-xl font-semibold text-primary-700">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 p-2 bg-neutral-50 shadow-md">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`font-bold text-center border p-2 border-primary-700 ${
              day === todayDayOfWeek ? "bg-primary-600 text-neutral-50" : ""
            }`}>
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      {selectedDate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-neutral-50 p-4 rounded shadow-lg w-8/12 max-h-[600px] overflow-y-auto hide-scrollbar">
            <div className="flex flex-col w-full verticalScroll">
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between w-full">
                  <h3 className="text-xl mb-4">
                    Add Schedule for {selectedDate.toDateString()}
                  </h3>

                  <X
                    onClick={() => setSelectedDate(null)}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex justify-start w-full mb-4">
                  <Btn
                    onClick={handleAddForm}
                    className="bg-primary-700 hover:bg-primary-600 text-neutral-50">
                    + Tambah
                  </Btn>
                </div>
              </div>

              <div className="flex flex-col w-full gap-y-3">
                {forms &&
                  forms?.map((form, index) => (
                    <form
                      key={index}
                      className="border border-outlineBorder p-4 rounded-md">
                      <div className="flex flex-col gap-y-4">
                        <div className="grid grid-cols-2 gap-x-4">
                          <FormSelect
                            data={dataSelects.rute}
                            label="Rute"
                            classLabel="w-full"
                            change={(e) =>
                              handleInputChange(index, "master_rute_id", e)
                            }
                            name="master_rute_id"
                            value={form?.master_rute_id}
                          />

                          <div className="flex flex-col w-full gap-y-3">
                            <FormInput
                              type="time"
                              placeholder="Waktu Berangkat"
                              className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                              id="waktu_berangkat"
                              name="waktu_keberangkatan"
                              value={form?.waktu_keberangkatan}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "waktu_keberangkatan",
                                  e.target.value
                                )
                              }
                              htmlFor="waktu_berangkat"
                              label="Waktu Berangkat"
                              classLabel="w-full"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4">
                          <FormSelect
                            data={dataSelects.mobil}
                            label="Mobil"
                            classLabel="w-full"
                            change={(e) =>
                              handleInputChange(index, "master_mobil_id", e)
                            }
                            name="master_mobil_id"
                            value={form?.master_mobil_id}
                          />

                          <FormSelect
                            data={dataSelects.supir}
                            label="Supir"
                            classLabel="w-full"
                            change={(e) =>
                              handleInputChange(index, "master_supir_id", e)
                            }
                            name="master_supir_id"
                            value={form?.master_supir_id}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-x-4">
                          <div className="flex flex-col w-full gap-y-3">
                            <FormInput
                              type="time"
                              placeholder="Waktu Tiba"
                              className="w-full block border border-outlineBorder rounded-md h-[40px] pl-3"
                              id="waktu_tiba"
                              name="waktu_tiba"
                              value={form?.waktu_tiba}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "waktu_tiba",
                                  e.target.value
                                )
                              }
                              htmlFor="waktu_tiba"
                              label="Waktu Tiba"
                              classLabel="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end w-full mt-4">
                        {index > 0 && (
                          <Btn
                            onClick={() => handleRemoveForm(index)}
                            className="bg-error-700 hover:bg-error-600 text-neutral-50 cursor-pointer">
                            Hapus
                          </Btn>
                        )}
                      </div>
                    </form>
                  ))}
              </div>

              <div className="flex justify-end space-x-2 mt-10">
                <Buttons
                  onClick={handleNewSchedule}
                  isLoading={isLoading}
                  disables={isLoading ? true : false}
                  type="submit"
                  className="w-full bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
                  name="Simpan"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {dateButton && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-neutral-50 p-4 rounded shadow-lg w-8/12 max-h-[600px] overflow-y-auto hide-scrollbar">
            <div className="flex flex-col w-full verticalScroll">
              <div className="flex flex-col w-full py-5 gap-y-4">
                <div className="flex flex-row justify-between w-full">
                  <h3 className="text-[20px] mb-4 text-center font-semibold w-full">
                    Jadwal Per Tanggal {formatTanggalPanjang(dateButton)}
                  </h3>

                  <X
                    onClick={() => setDateButton(null)}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex flex-col verticalScroll w-full h-[400px] pb-8 gap-y-12">
                  {schedule?.length === 0 ? (
                    <div>
                      <div colSpan={10}>
                        <p className="text-[32px] mt-5 font-light text-center">
                          Belum Ada jadwal
                        </p>
                      </div>
                    </div>
                  ) : (
                    schedule &&
                    schedule?.map((item, index) => (
                      <div
                        key={index}
                        className="w-11/12 self-center flex flex-col gap-y-1 border border-outlineBorder rounded-md">
                        <div className="flex items-center py-4 rounded-t-md bg-primary-700 flex-col gap-y-4">
                          <h2 className="text-neutral-50 font-semibold text-[20px]">
                            Jadwal {index + 1}
                          </h2>
                        </div>

                        <div className="w-full flex flex-row p-4 gap-x-5">
                          <div className="w-full flex flex-col gap-y-4">
                            <div className="w-full grid grid-cols-2">
                              <p>Berangkat</p>

                              <p>: {item?.master_rute?.kota_asal}</p>
                            </div>

                            <div className="w-full grid grid-cols-2">
                              <p>Mobil</p>

                              <p>: {item?.master_mobil?.type}</p>
                            </div>

                            <div className="w-full grid grid-cols-2">
                              <p>Waktu Keberangkatan</p>

                              <p>: {formatTime(item?.waktu_keberangkatan)}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-center w-0.5 h-[100px] bg-neutral-300"></div>

                          <div className="w-full flex flex-col gap-y-4">
                            <div className="w-full grid grid-cols-2">
                              <p>Tujuan</p>

                              <p>: {item?.master_rute?.kota_tujuan}</p>
                            </div>

                            <div className="w-full grid grid-cols-2">
                              <p>Supir</p>

                              <p>: {item?.master_supir?.nama}</p>
                            </div>

                            <div className="w-full grid grid-cols-2">
                              <p>Waktu Tiba</p>

                              <p>
                                :{" "}
                                {item?.waktu_tiba &&
                                  formatTime(item?.waktu_tiba)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoadingDatas ? (
        <div className="flex justify-center items-center pt-20">
          <div className="w-16 h-16 border-8 border-t-8 border-t-main border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-neutral-50 rounded-md border mt-8 w-full pb-4">
          <table className="w-full text-xs">
            <thead className="border-b">
              <tr className="text-center h-12 bg-gray-100">
                <th className="py-1 px-4">No</th>
                <th className="py-1 px-4">Mobil</th>
                <th className="py-1 px-4">Rute</th>
                <th className="py-1 px-4">Waktu Keberangkatan</th>
                <th className="py-1 px-4">Supir</th>
                <th className="py-1 w-56">Action</th>
              </tr>
            </thead>
            <tbody>
              {Jadwals.length <= 0 ? (
                <tr>
                  <td colSpan={10}>
                    <p className="text-lg mt-5 font-light text-center">
                      Data Kosong
                    </p>
                  </td>
                </tr>
              ) : (
                Jadwals &&
                currentItems &&
                currentItems?.map((item, index) => {
                  let time = "";
                  if (item?.waktu_keberangkatan) {
                    time = formatTime(item?.waktu_keberangkatan);
                  }

                  return (
                    <tr key={index} className="text-center border-b">
                      <td className="p-3 px-4">{index + 1}</td>
                      <td className="p-3 px-4">{item?.master_mobil?.type}</td>
                      <td className="p-3 px-4">
                        {item?.master_rute?.kota_asal} -{" "}
                        {item?.master_rute?.kota_tujuan}
                      </td>
                      <td className="p-3 px-4">{time}</td>
                      <td className="p-3 px-4">{item?.master_supir?.nama}</td>
                      <td className="p-2 flex flex-row items-center justify-center gap-4">
                        <Button
                          text={"edit"}
                          className={"h-8"}
                          icon={<FaRegPenToSquare />}
                          onButonClick={() => handleScheduleUpdate(item?.id)}
                        />
                        <Button
                          text={"delete"}
                          className={"h-8"}
                          color="red"
                          onButonClick={() => handleDeleteSchedule(item?.id)}
                          icon={<FaTrash />}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className="flex justify-end pr-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
