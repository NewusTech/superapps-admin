import Button from "elements/Button";
import SearchInput from "elements/Search";
import { VscKebabVertical } from "react-icons/vsc";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

export default function Pengguna() {
  const navigate = useNavigate();
  const handleOnAddUser = () => {
    navigate("/pengguna/tambah");
  };
  return (
    <>
      <div className="">
        <SearchInput />
      </div>
      <div className="mt-20">
        <Button text={"+ Tambah Pengguna"} onButoonClick={handleOnAddUser} />
        <div className="bg-white rounded-md border my-5">
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="ph-14 text-center bg-gray-100 border-b">
                <th className="p-3">Nama</th>
                <th className="p-3">Nomor</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="py-3 w-56">Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(2)].map((_, index) => (
                <tr key={index} className="py-4 border-b">
                  <td className="p-1 px-4 text-center">Dila</td>
                  <td className="p-1 text-center">08662787236</td>
                  <td className="p-1 text-center">Dila@mail.com</td>
                  <td className="p-1 text-center">Admin</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
