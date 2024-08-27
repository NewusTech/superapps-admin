import Button from "elements/Button";
import Pagination from "elements/pagination/pagination";
import React, { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { deleteDestination, getAllDestination } from "service/api";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import Loading from "elements/Loading";
import { Plus } from "lucide-react";
import SearchInput from "elements/Search";
import parse from "html-react-parser";
import { formatTanggalPanjang, truncateText } from "helpers";
import Swal from "sweetalert2";
import { useDebounce } from "hooks/useDebounce";

export default function ArticleDestinationScreen() {
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchAllDestinations = async (search) => {
    setIsLoading(true);
    try {
      const response = await getAllDestination(search);

      setDestination(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDestinations(debounceSearch);
  }, [debounceSearch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];
  if (destination) {
    currentItems = destination?.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math.ceil(destination?.length / itemsPerPage);

  const handleOnTambahDestination = () => {
    navigate("/article/article-destination/new-destination");
  };

  // const handleOnUpdateArticle = (id) => {
  //   navigate(`/article/update-article/${id}`);
  // };

  const handleDeleteDestination = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin menghapus pariwisata?",
        text: "Pariwisata yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteDestination(id);

        if (response.success === true) {
          await Swal.fire({
            icon: "success",
            title: `${response?.data?.judul} berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchAllDestinations(debounceSearch);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-row w-full gap-x-4">
        <SearchInput
          name="search"
          value={search}
          handleSearch={handleSearch}
          className="w-full"
        />

        <Button
          onButonClick={handleOnTambahDestination}
          text={"Tambah"}
          className={"h-11"}
          icon={<Plus />}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-neutral-50 rounded-md border mt-8 w-full pb-4">
          <table className="w-full text-xs">
            <thead className="border-b">
              <tr className="text-center h-12 bg-gray-100">
                <th className="py-1 px-4">No</th>
                <th className="py-1 px-4">Judul</th>
                <th className="py-1 px-4">Tanggal Dibuat</th>
                <th className="py-1 px-4">Konten</th>
                <th className="py-1 px-4">Foto Konten</th>
                <th className="py-1 w-56">Action</th>
              </tr>
            </thead>
            <tbody>
              {destination?.length <= 0 ? (
                <tr>
                  <td colSpan={10}>
                    <p className="text-lg mt-5 font-light text-center">
                      Data Kosong
                    </p>
                  </td>
                </tr>
              ) : (
                destination &&
                currentItems &&
                currentItems?.map((item, index) => {
                  let date = "";
                  if (item?.created_at) {
                    date = formatTanggalPanjang(item?.created_at);
                  }

                  let text = "";
                  if (item?.konten) {
                    text = truncateText(item?.konten, 300);
                  }

                  return (
                    <tr key={index} className="text-center border-b">
                      <td className="p-3 px-4">{index + 1}</td>
                      <td className="p-3 px-4">{item?.judul}</td>
                      <td className="p-3 px-4">{date}</td>
                      <td className="p-3 px-4">{parse(text)}</td>
                      <td className="p-3 px-4">
                        <AlertDialog>
                          <AlertDialogTrigger className="hover:underline hover:text-secondary">
                            Lihat
                          </AlertDialogTrigger>
                          <AlertDialogContent className="overflow-y-scroll hide-scrollbar w-full max-h-[600px] p-4">
                            <AlertDialogHeader className="flex flex-row w-full justify-between items-center">
                              <AlertDialogTitle>{item?.judul}</AlertDialogTitle>
                              <AlertDialogCancel className="bg-none outline-none mt-0 border-none">
                                <div className="hover:text-gray-700 mt-0 pt-0">
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
                            </AlertDialogHeader>
                            <div className="bg-gray-600 bg-opacity-50 flex justify-center items-center">
                              <div
                                className="bg-neutral-50 p-6 w-full"
                                ref={popupRef}>
                                <div className="w-full flex flex-col justify-center items-center mb-4">
                                  <img
                                    src={item?.image_url}
                                    alt={item?.judul}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                      <td className="p-2 flex flex-row items-center justify-center gap-x-4">
                        {/* <Button
                          text={"edit"}
                          className={"h-8"}
                          icon={<FaRegPenToSquare />}
                          onButonClick={() => handleOnUpdateArticle(item?.id)}
                        /> */}
                        <Button
                          text={"delete"}
                          className={"h-8"}
                          color="red"
                          onButonClick={() => handleDeleteDestination(item?.id)}
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
    </section>
  );
}
