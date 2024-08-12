import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDriver, getAllSupir } from "../../service/api";
import Loading from "../../elements/Loading";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import Pagination from "elements/pagination/pagination";
import { formatTanggalPanjang } from "helpers";
import Swal from "sweetalert2";

export default function Supir() {
  const navigate = useNavigate();
  const [supir, setSupir] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getSupir = async () => {
    setIsLoading(true);
    try {
      const response = await getAllSupir();
      setSupir(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSupir();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];
  if (supir) {
    currentItems = supir.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math.ceil(supir.length / itemsPerPage);

  const handleTambahSupir = () => {
    navigate("/driver/new-driver");
  };

  const handleDriverUpdate = (id) => {
    navigate(`/driver/update-driver/${id}`);
  };

  const handleDeleteDriver = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin menghapus data supir?",
        text: "Data supir yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteDriver(id);

        if (response.success === true) {
          await Swal.fire({
            icon: "success",
            title: `${response?.data?.nama} berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          getSupir();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen">
      <div>
        <SearchInput />
        <div className="pt-[29px]">
          <Link to="/driver/new-driver">
            <Button
              text="+ Tambah Supir"
              type="button"
              width="195"
              height="48"
              onButonClick={handleTambahSupir}
            />
          </Link>
        </div>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-10 border rounded-md bg-white w-full pb-4">
            <table className="w-full rounded-xl">
              <thead>
                <tr className="text-center bg-gray-100 border-b h-14">
                  <th className="p-3 font-bold">No</th>
                  <th className="p-3 font-bold">Nama Supir</th>
                  <th className="p-3 font-bold">NIK</th>
                  <th className="p-3 font-bold">Nomor Telepon</th>
                  <th className="p-3 font-bold">Tanggal Bergabung</th>
                  <th className="py-3 w-56">Action</th>
                </tr>
              </thead>
              <tbody>
                {supir && supir?.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  supir &&
                  currentItems &&
                  currentItems?.map((item, index) => {
                    let date;
                    if (item.tanggal_bergabung) {
                      date = formatTanggalPanjang(item?.tanggal_bergabung);
                    }

                    return (
                      <tr key={index} className="border-b text-center">
                        <td className="px-4 py-1">{index + 1}</td>
                        <td className="px-4 py-1">{item?.nama}</td>
                        <td className="px-4 py-1">{item?.nik}</td>
                        <td className="px-4 py-1">{item?.no_telp}</td>
                        <td className="px-4 py-1">{date}</td>
                        <td className="p-2 flex flex-row items-center justify-center gap-4">
                          <Button
                            text={"edit"}
                            className={"h-8"}
                            icon={<FaRegPenToSquare />}
                            onButonClick={() => handleDriverUpdate(item?.id)}
                          />
                          <Button
                            text={"delete"}
                            className={"h-8"}
                            color="red"
                            onButonClick={() => handleDeleteDriver(item?.id)}
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
    </section>
  );
}
