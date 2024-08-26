import React, { useEffect, useState } from "react";
import SearchInput from "elements/Search";
import Filter from "elements/Filter";
import DatePrintFilter from "elements/DatePrintFilter";
import { useDebounce } from "hooks/useDebounce";
import { Link, useNavigate } from "react-router-dom";
import ArrangeDate from "elements/filterArrangeDate/arrangeDate";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllReports } from "service/api";
import Select from "react-select";
import { columnReports } from "constants/constants";
import { formatDateArrange, formatTanggalPanjang, formatTime } from "helpers";
import Pagination from "elements/pagination/pagination";
import { NumericFormat } from "react-number-format";

export default function Laporan() {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleColumnSelect = (selectedOptions) => {
    setSelectedColumns(selectedOptions.map((option) => option.value));
  };

  const columnOptions = columnReports.map((col) => ({
    value: col.key,
    label: col.label,
  }));

  const fetchAllReports = async (search, startDate, endDate) => {
    setIsLoading(true);
    try {
      const response = await getAllReports(search, startDate, endDate);

      setReports(response.data);
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

  const [day, month, year] = startDateFormatted.split("-");
  const filterStartDate = `${year}-${month}-${day}`;
  const [day2, month2, year2] = endDateFormatted.split("-");
  const filterEndDate = `${year2}-${month2}-${day2}`;

  const displayedColumns =
    selectedColumns?.length > 0
      ? selectedColumns
      : columnReports?.map((col) => col?.key);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = [];
  if (reports?.laporan) {
    currentItems = reports?.laporan?.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math?.ceil(reports?.laporan?.length / itemsPerPage);

  useEffect(() => {
    fetchAllReports(debounceSearch, filterStartDate, filterEndDate);
  }, [debounceSearch, filterStartDate, filterEndDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="">
        <SearchInput name="search" value={search} handleSearch={handleSearch} />
        <div className="flex justify-between mt-8">
          <div className="space-x-4 flex items-center pt-4">
            <Filter active={false} />

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
          <div className="flex items-end">
            <div className="flex items-end gap-x-2">
              <div className="flex items-center space-x-2">
                <ArrangeDate
                  date={startDate}
                  setDate={(e) => setStartDate(e)}
                />
                <p className="text-center">to</p>
                <ArrangeDate date={endDate} setDate={(e) => setEndDate(e)} />
              </div>

              <div>
                <Button className="border border-outline_border-100 rounded-lg flex gap-x-2">
                  <Printer className="w-5 h-5 text-primary-700" />

                  <p className="text-primary-700 text-[14px]">Print</p>
                </Button>
              </div>
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
                    {columnReports
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
                  {reports?.laporan?.length === 0 ? (
                    <tr>
                      <td colSpan={10}>
                        <p className="text-lg my-5 font-light text-center">
                          Data Kosong
                        </p>
                      </td>
                    </tr>
                  ) : (
                    reports &&
                    reports?.laporan?.length > 0 &&
                    currentItems &&
                    currentItems?.length > 0 &&
                    currentItems?.map((item, index) => {
                      let date;
                      let time;
                      if (item?.tanggal_berangkat || item?.jam_berangkat) {
                        date = formatTanggalPanjang(item?.tanggal_berangkat);
                        time = formatTime(item?.jam_berangkat);
                      }

                      return (
                        <tr key={index} className="border-b">
                          {columnReports
                            ?.filter((col) =>
                              displayedColumns?.includes(col?.key)
                            )
                            ?.map((col) => {
                              return (
                                <td key={col?.key} className="p-3 text-center">
                                  {col?.key === "no" && index + 1}
                                  <Link
                                    className="hover:text-primary-700 hover:underline"
                                    to={`/travel-car-rent/detail-travel-car-rent/${item?.id}`}>
                                    {col?.key === "rute" && item?.rute}
                                  </Link>
                                  {col?.key === "mobil" && item?.mobil}
                                  {col?.key === "jam_berangkat" && time}
                                  {col?.key === "tanggal_berangkat" && date}
                                  {col?.key === "jumlah_penumpang" &&
                                    item?.jumlah_penumpang}
                                  {col?.key === "jumlah_harga" &&
                                    item?.jumlah_harga}
                                  {col?.key === "harga" && (
                                    <NumericFormat
                                      className=""
                                      displayType="text"
                                      prefix="Rp. "
                                      thousandsGroupStyle="none"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      value={item?.total_harga}
                                    />
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
                  <p className="text-left font-bold">Penumpang</p>
                  <p className="text-left">Total</p>
                </div>
                <div>
                  <p className="text-right font-bold">
                    {reports?.total_penumpang}
                  </p>
                  <p className="text-right">
                    <NumericFormat
                      className=""
                      displayType="text"
                      prefix="Rp. "
                      thousandsGroupStyle="none"
                      thousandSeparator="."
                      decimalSeparator=","
                      value={reports?.total_harga}
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
    </>
  );
}
