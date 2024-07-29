import React, { useEffect, useState } from "react";
import SearchInput from "components/Search";
import Filter from "components/Filter";
import { ReactComponent as IconPrint } from "assets/icons/Print.svg";
import DatePrintFilter from "components/DatePrintFilter";

export default function Laporan() {
  return (
    <>
      <div className="">
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
      <div className="pt-4">
        <div>
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="p-3">Rute</th>
                <th className="p-3">Mobil</th>
                <th className="p-3">Jam Berangkat</th>
                <th className="p-3">Jumlah Penumpang</th>
                <th className="p-3">Jumlah Harga</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index} className="h-14">
                  <td className="p-1 px-4 text-center">Palembang</td>
                  <td className="p-1 text-center">Toyota Hiace</td>
                  <td className="p-1 text-center">08.00</td>
                  <td className="p-1 text-center">5</td>
                  <td className="p-1 text-center">2.000.000</td>
                </tr>
              ))}
              <tr className="font-semibold border-t">
                <td className="p-3" colSpan={3}>
                  Total
                </td>
                <td className="p-3 text-center">25</td>
                <td className="p-3 text-center">10.000.000</td>
              </tr>
            </tbody>
          </table>
          {/* <div className="flex justify-between text-sm mt-5 bg-red-300">
            <p>Total</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
