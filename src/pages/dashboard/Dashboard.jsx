import React, { useEffect, useState } from "react";
import SearchInput from "elements/Search";
import Button from "elements/Button";
import Filter from "elements/Filter";
import { ReactComponent as IconPrint } from "assets/icons/Print.svg";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Select from "react-select";
import { columns, dataFilters } from "constants/constants";
import { formatDateArrange, formatLongDate, formatTime } from "helpers";
import { getAllPesanan } from "service/api";
import { useDebounce } from "hooks/useDebounce";
import Pagination from "elements/pagination/pagination";
import ArrangeDate from "elements/filterArrangeDate/arrangeDate";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);
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

  const columnOptions = columns.map((col) => ({
    value: col.key,
    label: col.label,
  }));

  const pesanan = async (search, status, startDates, endDates) => {
    setIsLoading(true);
    try {
      const response = await getAllPesanan(
        search,
        status,
        startDates,
        endDates
      );
      setOrder(response);
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

  const displayedColumns =
    selectedColumns?.length > 0
      ? selectedColumns
      : columns?.map((col) => col?.key);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = [];
  if (order?.data) {
    currentItems = order?.data?.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math?.ceil(order?.data?.length / itemsPerPage);

  useEffect(() => {
    pesanan(debounceSearch, filterStatus, startDateFormatted, endDateFormatted);
  }, [debounceSearch, filterStatus, startDateFormatted, endDateFormatted]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleOnTambahPesanan = () => {
    navigate("/order/choosing-car");
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
        <div className="pt-[29px]">
          <Button
            text="+ Tambah Pesanan"
            type="button"
            width="195"
            height="48"
            onButonClick={handleOnTambahPesanan}
          />
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
            <Filter
              active={filterStatus}
              handleButtonClick={handleOnFilterClear}
            />
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

          <div className="flex items-end gap-x-2">
            <div className="flex items-center space-x-2">
              <ArrangeDate date={startDate} setDate={(e) => setStartDate(e)} />
              <p className="text-center">to</p>
              <ArrangeDate date={endDate} setDate={(e) => setEndDate(e)} />
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
                    {columns
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
                  {order?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={10}>
                        <p className="text-lg mt-5 font-light text-center">
                          Data Kosong
                        </p>
                      </td>
                    </tr>
                  ) : (
                    order &&
                    order?.data?.length > 0 &&
                    currentItems &&
                    currentItems?.length > 0 &&
                    currentItems?.map((item, index) => {
                      let date;
                      if (item?.tanggal_berangkat) {
                        date = formatLongDate(item?.tanggal_berangkat);
                      }
                      let time;
                      if (item?.jam_berangkat) {
                        time = formatTime(item?.jam_berangkat);
                      }

                      return (
                        <tr key={item?.kode_pesanan} className="border-b">
                          {columns
                            ?.filter((col) =>
                              displayedColumns?.includes(col?.key)
                            )
                            ?.map((col) => {
                              return (
                                <td
                                  key={col?.key}
                                  className="px-3 py-1 text-center">
                                  {col?.key === "no" && index + 1}
                                  {col?.key === "nama_pemesan" &&
                                    item?.nama_pemesan}
                                  {col?.key === "rute" && item?.rute}
                                  {col?.key === "jam_berangkat" && time}
                                  {col?.key === "tanggal_berangkat" && date}
                                  {col?.key === "mobil" && item?.mobil}
                                  {col?.key === "supir" && item?.supir}
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
                                      <span className="bg-green-100 text-greenColor py-1 px-3 rounded text-xs">
                                        Sukses
                                      </span>
                                    ) : item?.status === "Gagal" ? (
                                      <span className="bg-red-100 text-redColor py-1 px-3 rounded text-xs">
                                        Gagal
                                      </span>
                                    ) : (
                                      <span className="bg-gray-300 text-textSecondary py-1 px-3 rounded text-xs">
                                        Menunggu
                                      </span>
                                    ))}
                                  {col?.key === "print" && (
                                    <button>
                                      <IconPrint stroke="#0705EC" />
                                    </button>
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
                  <p className="text-right font-bold">{order?.total_pesanan}</p>
                  <p className="text-right">
                    <NumericFormat
                      className=""
                      displayType="text"
                      prefix="Rp. "
                      thousandsGroupStyle="none"
                      thousandSeparator="."
                      decimalSeparator=","
                      value={order?.total_uang}
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
