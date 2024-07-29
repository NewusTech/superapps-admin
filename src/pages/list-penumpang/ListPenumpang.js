import React from "react";
import SearchInput from "../../components/Search";
import Filter from "../../components/Filter";
import { ReactComponent as IconPrint } from "../../assets/icons/Print.svg";
import DatePrintFilter from "../../components/DatePrintFilter";
const ListPenumpang = () => {
  return (
    <>
      <div>
        <div className="mb-2">
          <SearchInput />
          <div className="flex justify-between mt-8">
            <div className="space-x-1 flex items-center pt-4">
              <Filter active={false} />
            </div>
            <div className="flex items-end">
              <DatePrintFilter />
            </div>
          </div>
        </div>
        <div>
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-3">Supir</th>
                <th className="p-3">Rute</th>
                <th className="p-3">Jam Berangkat</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3" colSpan={2}>
                  Mobil
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-1 px-4">Hariyono</td>
                  <td className="p-1">Lampung - Jakarta</td>
                  <td className="p-1">13:00</td>
                  <td className="p-1">4-6-2024</td>
                  <td className="p-1">Toyota HiAce</td>
                  <td className="p-2">
                    <button>
                      <IconPrint stroke="#0705EC" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between text-sm mt-2">
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
export default ListPenumpang;
