import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { deleteCar, getAllMobil } from "service/api";
import Pagination from "elements/pagination/pagination";
import Loading from "elements/Loading";
import Swal from "sweetalert2";
import { RichTextDisplay } from "elements/richTextDisplay";

export default function Mobil() {
  const navigate = useNavigate();
  const [mobil, setMobil] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getMobil = async () => {
    setIsLoading(true);
    try {
      const cars = await getAllMobil();
      setMobil(cars?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMobil();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];
  if (mobil) {
    currentItems = mobil.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math.ceil(mobil.length / itemsPerPage);

  const handleAddMobil = () => {
    navigate("/travel-car/new-travel-car");
  };

  const handleUpdateMobil = (id) => {
    navigate(`/travel-car/update-travel-car/${id}`);
  };

  const handleDeleteCar = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin menghapus mobil?",
        text: "Mobil yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteCar(id);

        if (response.success === true) {
          await Swal.fire({
            icon: "success",
            title: `${response?.data?.type} berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          getMobil();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Button
            text="+ Tambah mobil"
            type="button"
            width="195"
            height="48"
            onButonClick={handleAddMobil}
          />
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pt-4">
          <div className="bg-neutral-50 rounded-md p-4">
            <table className="table-auto w-full">
              <thead>
                <tr className="text-center font-semibold bg-gray-100">
                  <th className="py-3">No</th>
                  <th className="py-3">Tipe Mobil</th>
                  <th className="py-3">Nomor Polisi</th>
                  <th className="py-3">Jumlah Kursi</th>
                  <th className="py-3">Fasilitas</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {mobil?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  mobil &&
                  currentItems &&
                  currentItems?.map((car, i) => {
                    return (
                      <tr key={i} className="border-b text-center">
                        <td className="p-2">{indexOfFirstItem + i + 1}</td>
                        <td className="p-2 px-4">{car?.type}</td>
                        <td className="p-2 px-4">{car?.nopol}</td>
                        <td className="p-2">{car?.jumlah_kursi}</td>
                        <td className="p-2">
                          <RichTextDisplay content={car?.fasilitas} />
                        </td>
                        <td className="p-2">{car?.status}</td>
                        <td className="p-2 flex flex-row items-center justify-center gap-4">
                          <Button
                            text={"edit"}
                            className={"h-8"}
                            icon={<FaRegPenToSquare />}
                            onButonClick={() => handleUpdateMobil(car?.id)}
                          />
                          <Button
                            text={"delete"}
                            className={"h-8"}
                            color="red"
                            onButonClick={() => handleDeleteCar(car?.id)}
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
        </div>
      )}
    </section>
  );
}
