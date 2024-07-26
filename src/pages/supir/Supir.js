import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSupir } from '../../service/api';
import Loading from '../../components/Loading';

const Supir = () => {
  const [supir, setSupir] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getSupir = async() => {
    setIsLoading(true);
    try {
      const response = await getAllSupir();
      setSupir(response?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

useEffect(()=> {
  getSupir();
}, [])
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
      <div className="mt-10 p-4 bg-white">
       {
        isLoading ? (
          <Loading />
        ) :
        <div>
        <table className="w-full border rounded-xl">
          <thead>
            <tr className="text-center bg-gray-100 ">
              <th className="p-3 font-bold">Nama Supir</th>
              <th className="p-3 font-bold">Nomor Telepon</th>
            </tr>
          </thead>
          <tbody>
            {
              supir.length === 0 ? (
                <tr>
                  <td colSpan={10}>
                    <p className="text-lg mt-5 font-light text-center">Data Kosong</p>
                  </td>
                </tr>
              ) :
                supir.map((item, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-3 px-4">{item.nama}</td>
                    <td className="p-3 px-4">{item.no_telp}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

       }
      </div>
    </section>
  );
};

export default Supir;
