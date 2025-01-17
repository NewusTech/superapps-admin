import Button from "elements/Button";
import InputText from "elements/InputText";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function TambahPeranPengguna() {
  return (
    <>
      <div className="mt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/user/user-role">
                Peran Pengguna
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tambah Peran Pengguna</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-14 bg-white w-1/3 p-4 shadow-sm">
        <div className="flex flex-col gap-8">
          <InputText label={"Role"} placeholder="Role" />
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="create"
                name="permission"
                className="bg-red-400"
              />
              <label htmlFor="create">Create</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="update"
                name="permission"
                className="bg-red-400"
              />
              <label htmlFor="update">Update</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="read"
                name="permission"
                className="bg-red-400"
              />
              <label htmlFor="read">Read</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="delete"
                name="permission"
                className="bg-red-400"
              />
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
