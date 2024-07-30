import React, { useEffect, useState } from "react";
import SearchInput from "components/Search";
import Button from "components/Button";
import Filter from "components/Filter";
import { ReactComponent as IconPrint } from "assets/icons/Print.svg";
import DatePrintFilter from "components/DatePrintFilter";
import { useNavigate } from "react-router-dom";
import { getAllPesanan } from "service/api";

const Dashboard = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const pesanan = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPesanan();
      setOrder(response?.data);
    } catch (error) {
      console.log(error.name);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnTambahPesanan = () => {
    navigate("/pesanan/tambah");
  };
  console.log(order);
  useEffect(() => {
    pesanan();
  }, []);
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
            onButoonClick={handleOnTambahPesanan}
          />
        </div>
        <div className="flex justify-between">
          <div className="space-x-1 flex items-center pt-4">
            <Button text="Semua" type="status-filter" active={true} />
            <Button text="Sukses" type="status-filter" active={false} />
            <Button text="Menunggu" type="status-filter" active={false} />
            <Button text="Gagal" type="status-filter" active={false} />
            <Filter active={false} />
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
          <div>
            <table className="table-auto w-full text-xs">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="p-3">No</th>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Rute</th>
                  <th className="p-3">Jam Berangkat</th>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Mobil</th>
                  <th className="p-3">Supir</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Print</th>
                </tr>
              </thead>
              <tbody>
                {order.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  order.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-1 text-center">{index + 1}</td>
                      <td className="p-1">{item.nama}</td>
                      <td className="p-1">
                        {item.jadwal.master_rute.kota_asal} -{" "}
                        {item.jadwal.master_rute.kota_tujuan}
                      </td>
                      <td className="p-1 ps-4">
                        {item.jadwal.waktu_keberangkatan}
                      </td>
                      <td className="p-1">{item.jadwal.tanggal_berangkat}</td>
                      <td className="p-1">{item.jadwal.master_mobil.type}</td>
                      <td className="p-1">{item.jadwal.master_supir.nama}</td>
                      <td className="p-1">{item.jadwal.master_rute.harga}</td>
                      <td className="p-1">
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
                      <td className="p-3">
                        <button>
                          <IconPrint stroke="#0705EC" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
        )}
      </div>
    </>
  );
};

export default Dashboard;
