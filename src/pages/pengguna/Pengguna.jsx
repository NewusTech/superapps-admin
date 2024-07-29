import Button from "components/Button";
import SearchInput from "components/Search";
import { VscKebabVertical } from "react-icons/vsc";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pengguna() {
  const navigate = useNavigate();
  const handleOnAddUser = () => {
    navigate("/tambah-pengguna");
  };
  return (
    <>
      <div className="">
        <SearchInput />
      </div>
      <div className="mt-20">
        <Button text={"+ Tambah Pengguna"} onButoonClick={handleOnAddUser} />
        <div className="mt-5 bg-white">
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="p-3">Nama</th>
                <th className="p-3">Nomor</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(2)].map((_, index) => (
                <tr key={index} className="h-14">
                  <td className="p-1 px-4 text-center">Dila</td>
                  <td className="p-1 text-center">08662787236</td>
                  <td className="p-1 text-center">Dila@mail.com</td>
                  <td className="p-1 text-center">Admin</td>
                  <td className="w-2">
                    <button className="hover:bg-gray-100 flex flex-col justify-center p-2">
                      <VscKebabVertical size={18} />
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
