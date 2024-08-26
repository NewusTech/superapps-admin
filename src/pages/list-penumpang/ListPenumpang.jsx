import React, { useEffect, useState } from "react";
import SearchInput from "../../elements/Search";
import Filter from "../../elements/Filter";
import Select from "react-select";
import { ReactComponent as IconPrint } from "../../assets/icons/Print.svg";
import DatePrintFilter from "../../elements/DatePrintFilter";
import { useDebounce } from "hooks/useDebounce";
import { Link, useNavigate } from "react-router-dom";
import ArrangeDate from "elements/filterArrangeDate/arrangeDate";
import { formatDateArrange, formatTanggalPanjang, formatTime } from "helpers";
import { getAllCustomerList } from "service/api";
import { columnCustomers } from "constants/constants";
import Pagination from "elements/pagination/pagination";

export default function ListPenumpang() {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [customers, setCustomers] = useState([]);
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

  const columnOptions = columnCustomers.map((col) => ({
    value: col.key,
    label: col.label,
  }));

  const fetchCustomerLists = async (search, startDate, endDate) => {
    setIsLoading(true);
    try {
      const response = await getAllCustomerList(search, startDate, endDate);
      setCustomers(response.data);
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
      : columnCustomers?.map((col) => col?.key);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = [];
  if (customers) {
    currentItems = customers?.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math?.ceil(customers?.length / itemsPerPage);

  useEffect(() => {
    fetchCustomerLists(debounceSearch, filterStartDate, filterEndDate);
  }, [debounceSearch, filterStartDate, filterEndDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <div>
        <div className="mb-2">
          <SearchInput
            name="search"
            value={search}
            handleSearch={handleSearch}
          />
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
              <div className="flex items-center space-x-2">
                <ArrangeDate
                  date={startDate}
                  setDate={(e) => setStartDate(e)}
                />
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
                      {columnCustomers
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
                    {customers?.length === 0 ? (
                      <tr>
                        <td colSpan={10}>
                          <p className="text-lg my-5 font-light text-center">
                            Data Kosong
                          </p>
                        </td>
                      </tr>
                    ) : (
                      customers &&
                      customers.length > 0 &&
                      currentItems &&
                      currentItems?.length > 0 &&
                      currentItems?.map((item, index) => {
                        let date;
                        let time;
                        if (item?.tanggal_awal_sewa || item?.jam_berangkat) {
                          date = formatTanggalPanjang(item?.tanggal_berangkat);
                          time = formatTime(item?.jam_berangkat);
                        }

                        return (
                          <tr key={index} className="border-b">
                            {columnCustomers
                              ?.filter((col) =>
                                displayedColumns?.includes(col?.key)
                              )
                              ?.map((col) => {
                                return (
                                  <td
                                    key={col?.key}
                                    className="p-3 text-center">
                                    {col?.key === "no" && index + 1}
                                    <Link
                                      className="hover:text-primary-700 hover:underline"
                                      to={`/travel-car-rent/detail-travel-car-rent/${item?.kode_pembayaran}`}>
                                      {col?.key === "supir" && item?.supir}
                                    </Link>
                                    {col?.key === "rute" && item?.rute}
                                    {col?.key === "jam_berangkat" && time}
                                    {col?.key === "tanggal_berangkat" && date}
                                    {col?.key === "mobil" && item?.mobil}
                                    {/* {col?.key === "print" && (
                                    <Btn
                                      onClick={() =>
                                        handleDownloadTicket(
                                          item?.kode_pembayaran
                                        )
                                      }
                                      disabled={isFirstLoading ? true : false}
                                      type="submit">
                                      {isFirstLoading ? (
                                        <Loader className="animate-spin" />
                                      ) : (
                                        <IconPrint />
                                      )}
                                    </Btn>
                                  )} */}
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
    </>
  );
}
