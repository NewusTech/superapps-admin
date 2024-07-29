import Button from "components/Button";
import SearchInput from "components/Search";
import React from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="mt-5 bg-white">
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(2)].map((_, index) => (
                <tr key={index} className="h-14">
                  <td className="p-1 px-4">Admin</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
