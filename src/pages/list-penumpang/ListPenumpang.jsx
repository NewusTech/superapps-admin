import React from "react";
import SearchInput from "../../elements/Search";
import Filter from "../../elements/Filter";
import { ReactComponent as IconPrint } from "../../assets/icons/Print.svg";
import DatePrintFilter from "../../elements/DatePrintFilter";
export default function ListPenumpang() {
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
        <div className="bg-white rounded-md border my-5">
          <table className="table-auto w-full text-xs border-b">
            <thead>
              <tr className="text-left font-semibold border-b bg-gray-100">
                <th className="p-3 text-center">Supir</th>
                <th className="p-3">Rute</th>
                <th className="p-3 text-center">Jam Berangkat</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3" colSpan={2}>
                  Mobil
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-1 px-4 text-center">Hariyono</td>
                  <td className="p-3">Lampung - Jakarta</td>
                  <td className="p-1 text-center">13:00</td>
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
        </div>
      </div>
    </>
  );
}
