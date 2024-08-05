import SearchInput from "elements/Search";
import Button from "elements/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "elements/Loading";
import { getAllRute } from "service/api";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

const Rute = () => {
  const [rute, setRute] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const getRute = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRute();
      setRute(response?.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(rute);

  const handleTambahRute = () => {
    navigate("/rute/tambah");
  };
  useEffect(() => {
    getRute();
  }, []);
  return (
    <section className="min-h-screen">
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Button
            text="+ Tambah Rute"
            type="button"
            width="195"
            height="48"
            onButoonClick={handleTambahRute}
          />
        </div>
      </div>
      <div className="pt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white rounded-md border">
            <table className="table-auto w-full text-xs">
              <thead>
                <tr className="border-b text-center bg-gray-100">
                  <th className="p-3">Dari</th>
                  <th className="p-3">Ke</th>
                  <th className="p-3">Harga</th>
                  <th className="py-3 w-56">Action</th>
                </tr>
              </thead>
              <tbody>
                {rute.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  rute.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="p-3 px-4">{item.kota_asal}</td>
                      <td className="p-3">{item.kota_tujuan}</td>
                      <td className="p-3">
                        Rp.{item.harga?.toLocaleString("id-ID")}
                      </td>
                      <td className="p-2 flex flex-row items-center justify-center gap-4">
                        <Button
                          text={"edit"}
                          className={"h-8"}
                          icon={<FaRegPenToSquare />}
                        />
                        <Button
                          text={"delete"}
                          className={"h-8"}
                          color="red"
                          icon={<FaTrash />}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rute;
