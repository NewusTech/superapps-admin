import React, { useEffect, useState } from "react";
import { Button as Btn } from "@/components/ui/button";
import SearchInput from "elements/Search";
import Button from "elements/Button";
import { Filter } from "lucide-react";
import { ReactComponent as IconPrint } from "assets/icons/Print.svg";
import { Link, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Select from "react-select";
import { columns, dataFilters } from "constants/constants";
import { formatDateArrange, formatLongDate, formatTime } from "helpers";
import { getAllPesanan, getDownloadTicket } from "service/api";
import { useDebounce } from "hooks/useDebounce";
import Pagination from "elements/pagination/pagination";
import ArrangeDate from "elements/filterArrangeDate/arrangeDate";
import { Loader, Plus, Printer } from "lucide-react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [order, setOrder] = useState();
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

  const handleDownloadTicket = async (paymentCode) => {
    try {
      setIsFirstLoading(true);

      const response = await getDownloadTicket(paymentCode);

      if (response?.success === true) {
        setIsFirstLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil download e-ticket!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });

        window.open(response?.data?.link, "_blank");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mendapatkan e-ticket!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFirstLoading(false);
    }
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
                                  <Link
                                    className="hover:text-primary-700 hover:underline"
                                    to={`/order/detail-order/${item?.kode_pesanan}`}>
                                    {col?.key === "nama_pemesan" &&
                                      item?.nama_pemesan}
                                  </Link>
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
                                    ) : (
                                      <div className="w-full bg-gray-300 px-3 py-2 rounded">
                                        <span className="text-textSecondary text-xs">
                                          Menunggu
                                        </span>
                                      </div>
                                    ))}
                                  {col?.key === "print" && (
                                    <>
                                      {item?.status === "Sukses" ? (
                                        <Btn
                                          onClick={() =>
                                            handleDownloadTicket(
                                              item?.kode_pembayaran
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
                                        <Btn disabled>
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
