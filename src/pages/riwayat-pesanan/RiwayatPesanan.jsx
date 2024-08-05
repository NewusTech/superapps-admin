import Filter from "../../elements/Filter";
import SearchInput from "../../elements/Search";
import { ReactComponent as IconPrint } from "../../assets/icons/Print.svg";
import DatePrintFilter from "../../elements/DatePrintFilter";
import { useState } from "react";
import { columns } from "constants/constants";
import Select from "react-select";

const RiwayatPesanan = () => {
  const [selectedColumns, setSelectedColumns] = useState([]);

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

  return (
    <>
      <div>
        <SearchInput />
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
      <div className="pt-2">
        <div className="bg-white rounded-md border my-5">
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="text-left bg-gray-100 border-b">
                {columns
                  .filter((col) => displayedColumns.includes(col.key))
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
              {[...Array(8)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-3 py-1 text-center">{index + 1}</td>
                  <td className="px-3 py-1">Dila Azzahra</td>
                  <td className="px-3 py-1">Palembang - Lampung</td>
                  <td className="px-3 py-1 text-center">08:00</td>
                  <td className="px-3 py-1">24-01-2024</td>
                  <td className="px-3 py-1">Toyota Hiace</td>
                  <td className="px-3 py-1">Ridwan</td>
                  <td className="px-3 py-1">250.000</td>
                  <td className="px-3 py-1">
                    <span className="bg-green-100 text-greenColor py-1 px-3 rounded text-xs">
                      Sukses
                    </span>
                  </td>
                  <td className="p-3">
                    <button>
                      <IconPrint stroke="#0705EC" />
                    </button>
                  </td>
                </tr>
              ))}
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
      </div>
    </>
  );
};

export default RiwayatPesanan;
