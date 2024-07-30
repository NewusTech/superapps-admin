import DateComponent from "components/DateComponent";
import SearchInput from "components/Search";
import TicketComponent from "components/TicketComponent";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TambahPesanan() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <div className="my-5">.</div>
      <div className="my-5">
        <div>
          <Link to={"/peran-pengguna"} className="text-main">
            Pesanan
          </Link>{" "}
          &gt; Tambah Pesanan
        </div>
      </div>
      <div className="bg-white p-4 flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <SearchInput className={"w-full"} />
          <div className="flex flex-row items-center gap-2 ml-auto">
            <DateComponent selectedDate={startDate} />
            <span className="text-sm ">to</span>
            <DateComponent
              selectedDate={endDate}
              onChangeDate={(date) => setEndDate(date)}
            />
          </div>
        </div>
        <div className="my-2">
          <TicketComponent />
        </div>
      </div>
    </>
  );
}
