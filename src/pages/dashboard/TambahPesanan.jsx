import Button from "elements/Button";
import DateComponent from "elements/DateComponent";
import InputSelect from "elements/InputSelect";
import InputText from "elements/InputText";
import SearchInput from "elements/Search";
import TicketComponent from "elements/TicketComponent";
import { formatLongDate } from "helpers";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllSchedules } from "service/api";

export default function TambahPesanan() {
  const naviagate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchBookings = async () => {
    try {
      const response = await getAllSchedules();

      setBookings(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="my-5">
        <div>
          <Link to={"/"} className="text-main">
            Pesanan
          </Link>{" "}
          &gt; Tambah Pesanan
        </div>
      </div>
      <div className="bg-neutral-50 p-4 flex flex-col gap-4">
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
        <div className="my-2 flex flex-col gap-4 max-h-screen hide-scrollbar overflow-y-auto">
          {bookings &&
            bookings?.map((item, i) => {
              return <TicketComponent key={i} data={item} />;
            })}
        </div>
      </div>
    </div>
  );
}
