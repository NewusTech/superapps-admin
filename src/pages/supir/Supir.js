import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Supir = () => {
  const drivers = [
    { name: 'Ahmad', phone: '087637373826' },
    { name: 'Ridwan', phone: '082639273939' },
    { name: 'Alwi', phone: '082830472987' },
    { name: 'Fauzan', phone: '083639274882' },
  ];

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
        <div>
          <table className="w-full border rounded-xl">
            <thead>
              <tr className="text-center bg-gray-100 ">
                <th className="p-3 font-bold">Nama Supir</th>
                <th className="p-3 font-bold">Nomor Telepon</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((_, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-3 px-4">{_.name}</td>
                  <td className="p-3 px-4">{_.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Supir;
