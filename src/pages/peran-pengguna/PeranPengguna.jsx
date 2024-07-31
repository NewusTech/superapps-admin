import Button from "components/Button";
import SearchInput from "components/Search";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

export default function PeranPengguna() {
  const navigate = useNavigate();
  const handleOnAddUser = () => {
    navigate("/tambah-peran-pengguna");
  };
  return (
    <>
      <div className="">
        <SearchInput />
      </div>
      <div className="mt-20">
        <Button text={"+ Tambah Peran"} onButoonClick={handleOnAddUser} />
        <div className="bg-white rounded-md border my-5 w-full xl:w-1/2">
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="h-10 bg-gray-100 border-b">
                <th className="text-left p-3">Role</th>
                <th className="py-3 w-56">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(2)].map((_, index) => (
                <tr key={index} className="h-10 border-b">
                  <td className="p-1 px-4">Admin</td>
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
