import Filter from "../../elements/Filter";
import SearchInput from "../../elements/Search";
import { ReactComponent as IconPrint } from "../../assets/icons/Print.svg";
import DatePrintFilter from "../../elements/DatePrintFilter";
import { useEffect, useState } from "react";
import { columns } from "constants/constants";
import Select from "react-select";
import { useDebounce } from "hooks/useDebounce";
import { NumericFormat } from "react-number-format";
import Pagination from "elements/pagination/pagination";
import { getAllPesanan } from "service/api";
import { formatLongDate, formatTime } from "helpers";

export default function RiwayatPesanan() {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateEnd, setFilterDateEnd] = useState("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(new Date());

  const pesanan = async (search, status, startDate, endDate) => {
    setIsLoading(true);
    try {
      const response = await getAllPesanan(search, status, startDate, endDate);
      setOrder(response);
    } catch (error) {
      console.log(error.name);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    pesanan(debounceSearch, "Sukses", filterDateStart, filterDateEnd);
  }, [debounceSearch, filterDateStart, filterDateEnd]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleColumnSelect = (selectedOptions) => {
    setSelectedColumns(selectedOptions.map((option) => option.value));
  };

  const columnOptions = columns.map((col) => ({
    value: col.key,
    label: col.label,
  }));

  const displayedColumns =
    selectedColumns.length > 0
      ? selectedColumns
      : columns.map((col) => col.key);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];
  if (order?.data) {
    currentItems = order?.data?.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math.ceil(order?.data?.length / itemsPerPage);

  return (
    <>
      <div>
        <SearchInput name="search" value={search} handleSearch={handleSearch} />
        <div className="flex justify-between mt-8 gap-x-5">
          <div className="space-x-1 flex items-center pt-4">
            <Filter active={false} />
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
              value={columnOptions.filter((option) =>
                selectedColumns.includes(option.value)
              )}
              className="basic-multi-select border border-main rounded-md"
              classNamePrefix="select"
            />
          </div>

          <div className="flex items-end">
            <DatePrintFilter />
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
                      .filter((col) => displayedColumns?.includes(col.key))
                      .map((col) => (
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
                    currentItems?.map((item, index) => {
                      const date = formatLongDate(item?.tanggal_berangkat);
                      const time = formatTime(item?.jam_berangkat);

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
                                    item?.status === "Sukses" && (
                                      <span className="bg-green-100 text-greenColor py-1 px-3 rounded text-xs">
                                        Sukses
                                      </span>
                                    )}
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
    </>
  );
}
