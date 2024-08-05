import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSupir } from "../../service/api";
import Loading from "../../elements/Loading";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

const Supir = () => {
  const [supir, setSupir] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getSupir = async () => {
    setIsLoading(true);
    try {
      const response = await getAllSupir();
      setSupir(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSupir();
  }, []);
  return (
    <section className="min-h-screen">
      <div>
        <SearchInput />
        <div className="pt-[29px]">
          <Link to="/supir/tambah">
            <Button text="+ Tambah" type="button" width="195" height="48" />
          </Link>
        </div>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-10 border rounded-md bg-white w-full xl:w-1/2">
            <table className="w-full rounded-xl">
              <thead>
                <tr className="text-center bg-gray-100 border-b h-14">
                  <th className="p-3 font-bold">Nama Supir</th>
                  <th className="p-3 font-bold">Nomor Telepon</th>
                  <th className="py-3 w-56">Action</th>
                </tr>
              </thead>
              <tbody>
                {supir.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-lg mt-5 font-light text-center">
                        Data Kosong
                      </p>
                    </td>
                  </tr>
                ) : (
                  supir.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="px-4 py-1">{item.nama}</td>
                      <td className="px-4 py-1">{item.no_telp}</td>
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

export default Supir;
