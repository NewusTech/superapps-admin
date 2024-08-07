import SearchInput from "elements/Search";
import Button from "elements/Button";
import { Link, useNavigate } from "react-router-dom";
import { deleteCabang, getAllCabang } from "service/api";
import { useEffect, useState } from "react";
import Loading from "elements/Loading";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import Pagination from "elements/pagination/pagination";
import Swal from "sweetalert2";

const Cabang = () => {
  const navigate = useNavigate();
  const [cabang, setCabang] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getCabang = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCabang();
      setCabang(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTambahCabang = () => {
    navigate("/cabang/tambah");
  };

  useEffect(() => {
    getCabang();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cabang.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cabang.length / itemsPerPage);

  const handleDeleteCabang = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin menghapus cabang?",
        text: "Cabang yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteCabang(id);

        if (response.success === true) {
          await Swal.fire({
            icon: "success",
            title: `${response?.data?.nama} berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          getCabang();
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
            text="+ Tambah Cabang"
            type="button"
            width="195"
            height="48"
            onButonClick={handleTambahCabang}
          />
        </div>
      </div>
      <div className="mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-neutral-50 rounded-md border w-full pb-4">
            <table className="w-full text-xs">
              <thead className="border-b">
                <tr className="text-center h-12 bg-gray-100">
                  <th className="py-1 px-4">No</th>
                  <th className="py-1 px-4">Cabang</th>
                  <th className="py-1 px-4">Alamat</th>
                  <th className="py-1 w-56">Action</th>
                </tr>
              </thead>
              <tbody>
                {cabang.length <= 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  cabang &&
                  currentItems?.map((item, index) => (
                    <tr key={index} className="text-center border-b">
                      <td className="p-3 px-4">{index + 1}</td>
                      <td className="p-3 px-4">{item.nama}</td>
                      <td className="p-3 px-4">{item.alamat}</td>
                      <td className="p-2 flex flex-row items-center justify-center gap-4">
                        <Button
                          text={"edit"}
                          className={"h-8"}
                          icon={<FaRegPenToSquare />}
                        />
                        <Button
                          text={"delete"}
                          className={"h-8"}
                          color="red"
                          onButonClick={() => handleDeleteCabang(item?.id)}
                          icon={<FaTrash />}
                        />
                      </td>
                    </tr>
                  ))
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
    </section>
  );
};

export default Cabang;
