import SearchInput from "elements/Search";
import Button from "elements/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "elements/Loading";
import { deleteRute, getAllRute } from "service/api";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import Pagination from "elements/pagination/pagination";
import Swal from "sweetalert2";

const Rute = () => {
  const navigate = useNavigate();
  const [rute, setRute] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getRute = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRute();
      setRute(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTambahRute = () => {
    navigate("/rute/tambah");
  };

  useEffect(() => {
    getRute();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rute.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rute.length / itemsPerPage);

  const handleDeleteRute = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin menghapus rute?",
        text: "Rute yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteRute(id);

        if (response.success === true) {
          await Swal.fire({
            icon: "success",
            title: `Rute Dari ${response?.data?.kota_asal} ke ${response?.data?.kota_tujuan} berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          getRute();
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
            text="+ Tambah Rute"
            type="button"
            width="195"
            height="48"
            onButonClick={handleTambahRute}
          />
        </div>
      </div>
      <div className="pt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-neutral-50 rounded-md border pb-4">
            <table className="table-auto w-full text-xs">
              <thead>
                <tr className="border-b text-center bg-gray-100">
                  <th className="p-3">No</th>
                  <th className="p-3">Dari</th>
                  <th className="p-3">Ke</th>
                  <th className="p-3">Waktu Keberangkatan</th>
                  <th className="p-3">Harga</th>
                  <th className="py-3 w-56">Action</th>
                </tr>
              </thead>
              <tbody>
                {rute?.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  rute &&
                  currentItems?.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="p-3 px-4">{index + 1}</td>
                      <td className="p-3 px-4">{item.kota_asal}</td>
                      <td className="p-3">{item.kota_tujuan}</td>
                      <td className="p-3">{item.waktu_keberangkatan}</td>
                      <td className="p-3">
                        Rp.{item.harga?.toLocaleString("id-ID")}
                      </td>
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
                          onButonClick={() => handleDeleteRute(item?.id)}
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

export default Rute;
