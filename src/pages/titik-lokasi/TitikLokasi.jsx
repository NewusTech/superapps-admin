import SearchInput from "../../elements/Search";
import Button from "../../elements/Button";
import { Link } from "react-router-dom";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

const TitikLokasi = () => {
  return (
    <section className="min-h-screen">
      <div className="">
        <div className="my-5">
          <SearchInput />
        </div>
        <div className="pt-[29px]">
          <Link to="/titik-lokasi/tambah">
            <Button text="+ Tambah" type="button" width="195" height="48" />
          </Link>
        </div>
      </div>
      <div className="pt-4">
        <div className="bg-white rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="p-4">Titik Penjemputan</th>
                <th className="p-4">Cabang</th>
                <th className="py-3 w-56">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-4 px-4">Kantor Cabang Ramatranz</td>
                  <td className="p-4 px-4">Lampung</td>
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
    </section>
  );
};

export default TitikLokasi;
