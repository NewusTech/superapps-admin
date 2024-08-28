import SearchInput from "../../elements/Search";
import { ReactComponent as IconPrint } from "../../assets/icons/Print.svg";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getAllPackages } from "service/api";
import {
  formatDateArrange,
  formatRupiah,
  formatRupiahString,
  formatTanggalPanjang,
} from "helpers";
import Pagination from "elements/pagination/pagination";
import { useDebounce } from "hooks/useDebounce";
import ArrangeDate from "elements/filterArrangeDate/arrangeDate";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { columnPakets } from "constants/constants";

export default function HotelScreen() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleColumnSelect = (selectedOptions) => {
    setSelectedColumns(selectedOptions.map((option) => option.value));
  };

  const columnOptions = columnPakets.map((col) => ({
    value: col.key,
    label: col.label,
  }));

  const fetchPackages = async (search, startDates, endDates) => {
    setIsLoading(true);
    try {
      const response = await getAllPackages(search, startDates, endDates);

      setPackages(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const startDateFormatted = startDate
    ? formatDateArrange(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate
    ? formatDateArrange(new Date(endDate))
    : undefined;

  useEffect(() => {
    fetchPackages(debounceSearch, startDateFormatted, endDateFormatted);
  }, [debounceSearch, startDateFormatted, endDateFormatted]);

  const displayedColumns =
    selectedColumns?.length > 0
      ? selectedColumns
      : columnPakets?.map((col) => col?.key);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];
  if (packages) {
    currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math.ceil(packages.length / itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleNewHostel = () => {
    navigate("/hostel/order-hostel");
  };

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <SearchInput name="search" value={search} handleSearch={handleSearch} />
        <div className="flex justify-between">
          <div className="flex flex-row gap-x-3 w-full">
            <div className="w-3/12">
              <Button
                onClick={handleNewHostel}
                className="bg-primary-700 flex gap-x-3 w-full">
                <Plus className="w-5 h-5 text-neutral-50" />
                <p className="text-neutral-50 text-[14px]">Tambah Paket</p>
              </Button>
            </div>

            <div className="w-full flex items-end">
              <Select
                id="columnSelect"
                options={columnOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={handleColumnSelect}
                placeholder="Select Columns"
                value={columnOptions?.filter((option) =>
                  selectedColumns?.includes(option?.value)
                )}
                className="basic-multi-select border border-main outline-none text-primary-700 rounded-md"
                classNamePrefix="select"
              />
            </div>
          </div>

          <div className="flex items-end gap-x-2">
            <div className="flex items-center space-x-2">
              <ArrangeDate date={startDate} setDate={(e) => setStartDate(e)} />
              <p className="text-center">to</p>
              <ArrangeDate date={endDate} setDate={(e) => setEndDate(e)} />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center pt-20">
          <div className="w-16 h-16 border-8 border-t-8 border-t-main border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="pt-4">
          <div className="py-2">
            <>
              <div className="bg-white rounded-md border my-5">
                <table className="table-auto w-full text-xs">
                  <thead>
                    <tr className="text-left bg-gray-100 border-b">
                      {columnPakets
                        ?.filter((col) => displayedColumns?.includes(col?.key))
                        ?.map((col) => (
                          <th
                            key={col.key}
                            className="p-3 text-center font-extrabold">
                            {col.label}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {packages?.data?.length === 0 ||
                    currentItems?.length === 0 ? (
                      <tr>
                        <td colSpan={10}>
                          <p className="text-lg mt-5 font-light text-center pb-5">
                            Data Kosong
                          </p>
                        </td>
                      </tr>
                    ) : (
                      packages &&
                      currentItems &&
                      currentItems?.map((paket, index) => {
                        let price;
                        if (paket?.biaya) {
                          price = formatRupiah(paket?.biaya);
                        }
                        let datePengirim;
                        let datePenerima;
                        if (paket?.tanggal_dikirim) {
                          datePengirim = formatTanggalPanjang(
                            paket?.tanggal_dikirim
                          );
                        }
                        if (paket?.tanggal_diterima) {
                          datePenerima = formatTanggalPanjang(
                            paket?.tanggal_diterima
                          );
                        }

                        return (
                          <tr key={index} className="border-b">
                            {columnPakets
                              ?.filter((col) =>
                                displayedColumns?.includes(col?.key)
                              )
                              ?.map((col) => {
                                return (
                                  <td
                                    key={col?.key}
                                    className="px-5 py-2 text-center">
                                    {col?.key === "no" && index + 1}
                                    <Link
                                      className="hover:text-primary-700 hover:underline"
                                      to={`/package/detail-package/${paket?.resi}`}>
                                      {col?.key === "kode_resi" && paket?.resi}
                                    </Link>
                                    {col?.key === "nama_pengirim" &&
                                      paket?.nama_pengirim}
                                    {/* {col?.key === "no_telp_pengirim" &&
                                paket?.no_telp_pengirim} */}
                                    {/* {col?.key === "alamat_pengirim" &&
                                paket?.alamat_pengirim} */}
                                    {/* {col?.key === "tanggal_dikirim" && datePengirim} */}
                                    {col?.key === "nama_penerima" &&
                                      paket?.nama_penerima}
                                    {/* {col?.key === "no_telp_penerima" &&
                                paket?.no_telp_penerima} */}
                                    {/* {col?.key === "alamat_penerima" &&
                                paket?.alamat_penerima} */}
                                    {/* {col?.key === "tanggal_diterima" && datePenerima} */}
                                    {col?.key === "jenis_paket" &&
                                      paket?.jenis_paket}
                                    {col?.key === "berat_paket" &&
                                      paket?.total_berat}
                                    {col?.key === "biaya" && price}
                                    {col?.key === "print" && (
                                      <Button
                                        // onClick={() =>
                                        //   handleDownloadTicket(item?.kode_pembayaran)
                                        // }
                                        // disabled={isFirstLoading ? true : false}
                                        type="submit">
                                        {/* {isFirstLoading ? (
                                    <Loader className="animate-spin" />
                                  ) : ( */}
                                        <IconPrint />
                                        {/* )} */}
                                      </Button>
                                    )}
                                  </td>
                                );
                              })}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </>
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
      )}
    </>
  );
}
