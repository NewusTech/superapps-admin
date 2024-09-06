import React, { useEffect, useState } from "react";
import { Button as Btn } from "@/components/ui/button";
import SearchInput from "elements/Search";
import Button from "elements/Button";
import { Filter } from "lucide-react";
import { ReactComponent as IconPrint } from "assets/icons/Print.svg";
import { Link, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Select from "react-select";
import { columnRentals, columns, dataFilters } from "constants/constants";
import {
  formatDateArrange,
  formatLongDate,
  formatTanggalPanjang,
  formatTime,
} from "helpers";
import {
  getAllPesanan,
  getAllTravelCarRent,
  getDownloadTicket,
} from "service/api";
import { useDebounce } from "hooks/useDebounce";
import Pagination from "elements/pagination/pagination";
import ArrangeDate from "elements/filterArrangeDate/arrangeDate";
import { Loader, Plus, Printer } from "lucide-react";
import Swal from "sweetalert2";

export default function RentalScreen() {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [rent, setRent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateEnd, setFilterDateEnd] = useState("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleColumnSelect = (selectedOptions) => {
    setSelectedColumns(selectedOptions.map((option) => option.value));
  };

  const columnOptions = columnRentals.map((col) => ({
    value: col.key,
    label: col.label,
  }));

  const fetchRentalHistory = async (search, status, startDate, endDate) => {
    setIsLoading(true);
    try {
      const response = await getAllTravelCarRent(
        search,
        status,
        startDate,
        endDate
      );
      setRent(response);
    } catch (error) {
      console.log(error.name);
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

  const [day, month, year] = startDateFormatted.split("-");
  const filterStartDate = `${year}-${month}-${day}`;
  const [day2, month2, year2] = endDateFormatted.split("-");
  const filterEndDate = `${year2}-${month2}-${day2}`;

  const displayedColumns =
    selectedColumns?.length > 0
      ? selectedColumns
      : columnRentals?.map((col) => col?.key);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = [];
  if (rent?.data) {
    currentItems = rent?.data?.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math?.ceil(rent?.data?.length / itemsPerPage);

  useEffect(() => {
    fetchRentalHistory(
      debounceSearch,
      filterStatus,
      filterStartDate,
      filterEndDate
    );
  }, [debounceSearch, filterStatus, filterStartDate, filterEndDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleOnTambahPesanan = () => {
    navigate("/travel-car-rent/order-travel-car-rent");
  };

  const handleOnFilterClear = () => {
    setFilterStatus("");
    setFilterDateStart(null);
    setFilterDateEnd(null);
  };

  const handleOnSetFilter = (value) => {
    setFilterStatus(value !== "" ? value : "");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="">
        <SearchInput name="search" value={search} handleSearch={handleSearch} />
        <div className="pt-[29px] w-full flex flex-row justify-between gap-x-4">
          <div className="w-3/12">
            <Btn
              onClick={handleOnTambahPesanan}
              className="bg-primary-700 flex gap-x-3 w-full">
              <Plus className="w-5 h-5 text-neutral-50" />
              <p className="text-neutral-50 text-[14px]">Tambah Pesanan</p>
            </Btn>
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
        <div className="flex flex-row justify-between gap-x-3">
          <div className="space-x-1 flex items-end pt-4">
            {dataFilters?.map((f) => (
              <Button
                key={f.name}
                text={f.name}
                type="status-filter"
                active={filterStatus === f?.filter}
                onButonClick={() => handleOnSetFilter(f?.filter)}
              />
            ))}
            <Btn className="border border-primary-700 rounded-lg">
              <Filter className="w-5 h-5 text-primary-700" />
            </Btn>
          </div>

          <div className="flex items-end gap-x-2">
            <div className="flex items-center space-x-2">
              <ArrangeDate date={startDate} setDate={(e) => setStartDate(e)} />
              <p className="text-center">to</p>
              <ArrangeDate date={endDate} setDate={(e) => setEndDate(e)} />
            </div>

            <div>
              <Btn className="border border-outline_border-100 rounded-lg flex gap-x-2">
                <Printer className="w-5 h-5 text-primary-700" />

                <p className="text-primary-700 text-[14px]">Print</p>
              </Btn>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2">
        {isLoading ? (
          <div className="flex justify-center items-center pt-20">
            <div className="w-16 h-16 border-8 border-t-8 border-t-main border-gray-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-md border my-5">
              <table className="table-auto w-full text-xs">
                <thead>
                  <tr className="text-left bg-gray-100 border-b">
                    {columnRentals
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
                  {rent?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={10}>
                        <p className="text-lg my-5 font-light text-center">
                          Data Kosong
                        </p>
                      </td>
                    </tr>
                  ) : (
                    rent &&
                    rent?.data?.length > 0 &&
                    currentItems &&
                    currentItems?.length > 0 &&
                    currentItems?.map((item, index) => {
                      let dateStartRent;
                      let dateEndRent;
                      if (item?.tanggal_awal_sewa || item?.tanggal_akhir_sewa) {
                        dateEndRent = formatTanggalPanjang(
                          item?.tanggal_akhir_sewa
                        );
                        dateStartRent = formatTanggalPanjang(
                          item?.tanggal_awal_sewa
                        );
                      }

                      return (
                        <tr key={index} className="border-b">
                          {columnRentals
                            ?.filter((col) =>
                              displayedColumns?.includes(col?.key)
                            )
                            ?.map((col) => {
                              return (
                                <td key={col?.key} className="p-3 text-center">
                                  {col?.key === "no" && index + 1}
                                  <Link
                                    className="hover:text-primary-700 hover:underline"
                                    to={`/travel-car-rent/detail-travel-car-rent/${item?.kode_pembayaran}`}>
                                    {col?.key === "nama" && item?.nama}
                                  </Link>
                                  {col?.key === "mobil_type" &&
                                    item?.mobil_type}
                                  {col?.key === "area" && item?.area}
                                  {col?.key === "durasi_sewa" &&
                                    item?.durasi_sewa}
                                  {col?.key === "tanggal_awal_sewa" &&
                                    dateStartRent}
                                  {col?.key === "tanggal_akhir_sewa" &&
                                    dateEndRent}
                                  {col?.key === "harga" && (
                                    <NumericFormat
                                      className=""
                                      displayType="text"
                                      prefix="Rp. "
                                      thousandsGroupStyle="none"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      value={item?.harga}
                                    />
                                  )}
                                  {col?.key === "status" &&
                                    (item?.status === "Sukses" ? (
                                      <div className="w-full bg-green-100 px-3 py-2 rounded">
                                        <span className="text-greenColor text-xs">
                                          Sukses
                                        </span>
                                      </div>
                                    ) : item?.status === "Gagal" ? (
                                      <div className="w-full bg-red-100 px-3 py-2 rounded">
                                        <span className="text-redColor text-xs">
                                          Gagal
                                        </span>
                                      </div>
                                    ) : item?.status === "Kadaluwarsa" ? (
                                      <div className="w-full bg-thirtiary-400 px-3 py-2 rounded">
                                        <span className="text-thirtiary-700 text-xs">
                                          Kadaluwarsa
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="w-full bg-gray-300 px-3 py-2 rounded">
                                        <span className="text-textSecondary text-xs">
                                          Menunggu
                                        </span>
                                      </div>
                                    ))}
                                  {col?.key === "print" && (
                                    <>
                                      {item && item?.status === "Sukses" ? (
                                        <Btn
                                          onClick={() =>
                                            window.open(
                                              `https://backend-superapps.newus.id/rental/e-tiket/${item?.kode_pembayaran}`,
                                              "_blank"
                                            )
                                          }
                                          disabled={
                                            isFirstLoading ? true : false
                                          }
                                          type="submit">
                                          {isFirstLoading ? (
                                            <Loader className="animate-spin" />
                                          ) : (
                                            <IconPrint />
                                          )}
                                        </Btn>
                                      ) : (
                                        <Btn disabled type="submit">
                                          <IconPrint />
                                        </Btn>
                                      )}
                                    </>
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
              <div className="flex justify-between text-sm mt-2 p-4">
                <div>
                  <p className="text-left font-bold">Pesanan</p>
                  <p className="text-left">Total</p>
                </div>
                <div>
                  <p className="text-right font-bold">{rent?.total_pesanan}</p>
                  <p className="text-right">
                    <NumericFormat
                      className=""
                      displayType="text"
                      prefix="Rp. "
                      thousandsGroupStyle="none"
                      thousandSeparator="."
                      decimalSeparator=","
                      value={rent?.total_uang}
                    />
                  </p>
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
          </>
        )}
      </div>
    </div>
  );
}
