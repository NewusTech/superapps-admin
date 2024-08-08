import React, { useState, useEffect, useRef } from "react";
import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import { Button as Btn } from "@/components/ui/button";
import Buttons from "elements/form/button/button";
import { getAllMobil, getSeatsByCar, updateStatusSeats } from "service/api";
import Pagination from "elements/pagination/pagination";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SwitchInput from "elements/form/switchInput/switchInput";

const Kursi = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [seats, setSeats] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const [updateSeats, setUpdateSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllCars = async () => {
    try {
      const response = await getAllMobil();

      setCars(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const handleClickCar = async (id) => {
    try {
      const response = await getSeatsByCar(id);

      setSeats(response?.data);
      setSelectedCarId(id);
      setIsPopupOpen(true);
      setUpdateSeats(
        response?.data?.map((seat) => ({
          id: seat.id,
          status: seat.status,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchChange = (index) => {
    setUpdateSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((seat, idx) =>
        idx === index
          ? { ...seat, status: seat.status === "kosong" ? "terisi" : "kosong" }
          : seat
      );
      return updatedSeats;
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const formattedSeats = updateSeats.map((seat) => ({
        id: seat.id,
        status: seat.status,
      }));

      console.log("Formatted Seats:", formattedSeats);

      for (const seat of formattedSeats) {
        try {
          const response = await updateStatusSeats(seat.id, formattedSeats);

          if (!response.ok) {
            throw new Error(`Failed to update seat ${seat.id}`);
          }
        } catch (error) {
          console.error("Error updating seat status:", error);
        }
      }

      setIsPopupOpen(false);
      fetchAllCars();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen">
      <div>
        <SearchInput />
      </div>
      <div className="mt-10">
        <div className="bg-white rounded-md border my-5">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-center bg-gray-100 border-b h-14">
                <th className="p-3">No</th>
                <th className="p-3">Mobil</th>
                <th className="p-3">Jumlah Kursi Tersedia</th>
                <th className="p-3">Out of Order</th>
              </tr>
            </thead>
            <tbody>
              {cars &&
                currentItems.map((car, index) => {
                  return (
                    <tr key={index} className="border-b text-center">
                      <td className="px-3 py-1">{index + 1}</td>
                      <td className="px-3 py-1">
                        <AlertDialog>
                          <AlertDialogTrigger
                            onClick={() => handleClickCar(car.id)}
                            className="hover:underline">
                            {car?.type}
                          </AlertDialogTrigger>
                          <AlertDialogContent className="overflow-y-scroll hide-scrollbar w-full max-h-[600px]">
                            <AlertDialogHeader>
                              <AlertDialogTitle>{car.type}</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="bg-gray-600 bg-opacity-50 flex justify-center items-center">
                              <div
                                className="bg-neutral-50 p-6 w-full"
                                ref={popupRef}>
                                <div className="flex justify-between items-center mb-4">
                                  <h2 className="text-xl">Setting Kursi</h2>
                                  <AlertDialogCancel className="bg-none outline-none">
                                    <div className="hover:text-gray-700">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </div>
                                  </AlertDialogCancel>
                                </div>
                                <div className="mb-4">
                                  <div className="my-4 border rounded-md overflow-hidden">
                                    <div className="flex flex-row gap-4 justify-around border-b items-center h-10 bg-gray-50 py-6 font-bold">
                                      <span className="w-36 text-center">
                                        Jumlah Kursi
                                      </span>
                                      <span className="w-36 text-center">
                                        Aksi
                                      </span>
                                    </div>
                                    {seats.map((seat, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-row gap-4 justify-around items-center h-10 my-4">
                                          <span className="w-36 text-center">
                                            {seat?.nomor_kursi}
                                          </span>
                                          <SwitchInput
                                            checked={
                                              updateSeats[index].status ===
                                              "terisi"
                                            }
                                            onChange={() =>
                                              handleSwitchChange(index)
                                            }
                                            className="bg-primary-700 rounded-full"
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div className="flex justify-end">
                                    <Buttons
                                      onClick={handleSave}
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
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                      <td className="px-3 py-1">{car?.available_seats}</td>
                      <td className="px-3 py-1">
                        <SwitchInput className="bg-primary-700 rounded-full" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex justify-end pr-4 mb-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kursi;
