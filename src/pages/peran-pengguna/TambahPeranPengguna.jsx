import Button from "components/Button";
import InputText from "components/InputText";
import React from "react";
import { Link } from "react-router-dom";

export default function TambahPeranPengguna() {
  return (
    <>
      <div className="mt-20">
        <div>
          <Link to={"/peran-pengguna"} className="text-main">
            Peran Pengguna
          </Link>{" "}
          &gt; Tambah Peran Pengguna
        </div>
      </div>
      <div className="mt-14 bg-white w-1/3 p-4 shadow-sm">
        <div className="flex flex-col gap-8">
          <InputText label={"Role"} placeholder="Role" />
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                id="create"
                name="permission"
                className="bg-red-400"
              />
              <label htmlFor="create">Create</label>
            </div>
            <div className="flex flex-row gap-2">
              <input type="radio" id="update" name="permission" />
              <label htmlFor="update">Update</label>
            </div>
            <div className="flex flex-row gap-2">
              <input type="radio" id="read" name="permission" />
              <label htmlFor="read">Read</label>
            </div>
            <div className="flex flex-row gap-2">
              <input type="radio" id="delete" name="permission" />
              <label htmlFor="delete">Delete</label>
            </div>
          </div>
        </div>
        <div className="w-full mt-10">
          <Button text={"Tambah"} className={"w-full h-14"} />
        </div>
      </div>
    </>
  );
}
