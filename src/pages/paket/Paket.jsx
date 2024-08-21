import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import Filter from "../../elements/Filter";
import { ReactComponent as IconPrint } from "../../assets/icons/Print.svg";
import DatePrintFilter from "../../elements/DatePrintFilter";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPackages } from "service/api";
import { formatRupiah } from "helpers";
import Pagination from "elements/pagination/pagination";

export default function Paket() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchPackages = async () => {
    try {
      const response = await getAllPackages();

      setPackages(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];
  if (packages) {
    currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math.ceil(packages.length / itemsPerPage);

  console.log(packages, "ini paket");

  const handleNewPaket = () => {
    navigate("/package/create-package");
  };

  return (
    <>
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Button
            text="+ Tambah"
            type="button"
            width="195"
            height="48"
            onButonClick={handleNewPaket}
          />
        </div>
        <div className="flex justify-between">
          <div className="space-x-1 flex items-center pt-4">
            <Filter active={false} />
          </div>
          <div className="flex items-end">
            <DatePrintFilter />
          </div>
        </div>
      </div>
      <div className="pt-4">
        <div className="bg-white rounded-md border my-5">
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="text-left bg-gray-100 border-b">
                <th className="p-3">No</th>
                <th className="p-3">Nama Pengirim</th>
                <th className="p-3">Nama Penerima</th>
                <th className="p-3">Jenis</th>
                <th className="p-3">Total Berat</th>
                <th className="p-3">Biaya</th>
                <th className="p-3">Print</th>
              </tr>
            </thead>
            <tbody>
              {packages &&
                currentItems &&
                currentItems?.map((paket, index) => {
                  let price;
                  if (paket?.biaya) {
                    price = formatRupiah(paket?.biaya);
                  }

                  return (
                    <tr key={index} className="border-b">
                      <td className="px-3 py-1">{index + 1}</td>
                      <td className="px-3 py-1">{paket?.nama_pengirim}</td>
                      <td className="px-3 py-1">{paket?.nama_penerima}</td>
                      <td className="px-3 py-1">{paket?.jenis_paket}</td>
                      <td className="px-3 py-1">{paket?.total_berat} Kg</td>
                      <td className="px-3 py-1">{price}</td>
                      <td className="px-3 py-1">
                        <button>
                          <IconPrint stroke="#0705EC" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="flex justify-between text-sm mt-2 p-4">
            <div>
              <p className="text-left font-bold">Pesanan</p>
              <p className="text-left">Total</p>
            </div>
            <div>
              <p className="text-right font-bold">8</p>
              <p className="text-right">2.000.000</p>
            </div>
          </div>
        </div>
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
    </>
  );
}
