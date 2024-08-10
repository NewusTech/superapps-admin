import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { deleteTitikLokasi, getAllTitikLokasi } from "service/api";
import Loading from "elements/Loading";
import Pagination from "elements/pagination/pagination";
import Swal from "sweetalert2";

const TitikLokasi = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getTitikLokasi = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTitikLokasi();
      setLocation(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTitikLokasi();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = location.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(location.length / itemsPerPage);

  const handleAddTitik = () => {
    navigate("/location-point/new-location-point");
  };

  const handleDeleteTitikLokasi = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin menghapus titik lokasi?",
        text: "Titik Lokasi yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteTitikLokasi(id);

        if (response.success === true) {
          await Swal.fire({
            icon: "success",
            title: `${response?.data?.nama} berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          getTitikLokasi();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="">
        <div className="my-5">
          <SearchInput />
        </div>
        <div className="pt-[29px]">
          <Link to="/location-point/new-location-point">
            <Button
              text="+ Tambah Titik"
              type="button"
              width="195"
              height="48"
              onButonClick={handleAddTitik}
            />
          </Link>
        </div>
      </div>
      <div className="pt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-neutral-50 rounded-md border w-full pb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-center bg-gray-100">
                  <th className="p-4">No</th>
                  <th className="p-4">Titik Penjemputan</th>
                  <th className="p-4">Cabang</th>
                  <th className="py-3 w-56">Action</th>
                </tr>
              </thead>
              <tbody>
                {location && location?.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  location &&
                  currentItems?.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="p-4 px-4">{index + 1}</td>
                      <td className="p-4 px-4">{item.nama}</td>
                      <td className="p-4 px-4">Lampung</td>
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
                          onButonClick={() => handleDeleteTitikLokasi(item?.id)}
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

export default TitikLokasi;
