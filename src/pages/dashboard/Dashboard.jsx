import React, { useEffect, useState } from "react";
import SearchInput from "components/Search";
import Button from "components/Button";
import Filter from "components/Filter";
import { ReactComponent as IconPrint } from "assets/icons/Print.svg";
import DatePrintFilter from "components/DatePrintFilter";
import { useNavigate } from "react-router-dom";
import { getAllPesanan } from "service/dashboard"
import { NumericFormat } from "react-number-format";

const dataFilter = [
  {
    name: "Semua",
    filter: ""
  },
  {
    name: "Sukses",
    filter: "sukses"
  },
  {
    name: "Menunggu",
    filter: "menunggu"
  },
  {
    name: "Gagal",
    filter: "gagal"
  },
]

const Dashboard = () => {
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState(true);
  const [filterDateStart, setFilterDateStart] = useState(null);
  const [filterDateEnd, setFilterDateEnd] = useState(null);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const pesanan = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPesanan();
      setOrder(response);
      console.log({ response })
    } catch (error) {
      console.log(error.name);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOnTambahPesanan = () => {
    navigate("/pesanan/tambah");
  };
  const hanldeOnFilterClear = () => {
    setFilterStatus(false);
    setFilter("");
    setFilterDateStart(null);
    setFilterDateEnd(null);
  }
  const handleOnSetFilter = (value) => {
    setFilter(value);
    setFilterStatus(value != "")
  }
  useEffect(() => {
    pesanan();
  }, []);
  useEffect(() => {
    console.log(order)
  }, [order]);
  useEffect(() => {
    console.log({ filterDateEnd, filterDateStart })
  }, [filterDateStart, filterDateEnd])
  return (
    <>
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Button
            text="+ Tambah Pesanan"
            type="button"
            width="195"
            height="48"
            onButonClick={handleOnTambahPesanan}
          />
        </div>
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          <div className="space-x-1 flex items-center pt-4">
            {dataFilter.map((f) => (
              <Button key={f.name} text={f.name} type="status-filter" active={filter == f.filter} onButonClick={() => handleOnSetFilter(f.filter)} />
            ))}
            <Filter active={filterStatus} handleButtonClick={hanldeOnFilterClear} />
          </div>
          <div className="flex items-end">
            <DatePrintFilter startDate={filterDateStart} setStartDate={setFilterDateStart} endDate={filterDateEnd} setEndDate={setFilterDateEnd} />
          </div>
        </div>
      </div>

      <div className="py-2">
        {isLoading ? (
          <div className="flex justify-center items-center pt-20">
            <div className="w-16 h-16 border-8 border-t-8 border-t-main border-gray-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-md border my-5">
            <table className="table-auto w-full text-xs">
              <thead>
                <tr className="text-left bg-gray-100 border-b">
                  <th className="p-3 text-center">No</th>
                  <th className="p-3 w-56 text-center">Nama</th>
                  <th className="p-3 text-center">Rute</th>
                  <th className="p-3 text-center">Jam Berangkat</th>
                  <th className="p-3 text-center">Tanggal</th>
                  <th className="p-3 text-center">Mobil</th>
                  <th className="p-3 text-center">Supir</th>
                  <th className="p-3 text-center">Harga</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Print</th>
                </tr>
              </thead>
              <tbody>
                {Array(order.data).length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  order.data?.map((item, index) => (
                    <tr key={item.kode_pesanan} className="border-b">
                      <td className="px-3 py-1 text-center">{index + 1}</td>
                      <td className="px-3 py-1 text-center">{item.nama_pemesan}</td>
                      <td className="px-3 py-1 text-center">
                        {item.rute}
                      </td>
                      <td className="px-3 py-1 text-center">
                        {item.jam_berangkat}
                      </td>
                      <td className="px-3 py-1 text-center">{item.tanggal_berangkat}</td>
                      <td className="px-3 py-1 text-center">{item.mobil}</td>
                      <td className="px-3 py-1 text-center">{item.supir}</td>
                      <td className="px-3 py-1 text-center">
                        <NumericFormat
                          className=""
                          displayType="text"
                          prefix="Rp. "
                          thousandsGroupStyle="none"
                          thousandSeparator="."
                          decimalSeparator=","
                          value={item.harga}
                        />
                      </td>
                      <td className="px-3 py-1 text-center">
                        {item.status === "Sukses" ? (
                          <span className="bg-green-100 text-greenColor py-1 px-3 rounded text-xs">
                            Sukses
                          </span>
                        ) : item.status === "Gagal" ? (
                          <span className="bg-red-100 text-redColor py-1 px-3 rounded text-xs">
                            Gagal
                          </span>
                        ) : (
                          <span className="bg-gray-300 text-gray-600 py-1 px-3 rounded text-xs">
                            Menunggu
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-1 text-center">
                        <button>
                          <IconPrint stroke="#0705EC" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="flex justify-between text-sm mt-2 p-4">
              <div>
                <p className="text-left font-bold">Pesanan</p>
                <p className="text-left">Total</p>
              </div>
              <div>
                <p className="text-right font-bold">{order.total_pesanan}</p>
                <p className="text-right"><NumericFormat
                  className=""
                  displayType="text"
                  prefix="Rp. "
                  thousandsGroupStyle="none"
                  thousandSeparator="."
                  decimalSeparator=","
                  value={order.total_uang}
                /></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
