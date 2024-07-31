import SearchInput from "../../components/Search";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

const Mobil = () => {
  const [mobil, setMobil] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const navigate = useNavigate();

  const getMobil = async () => {
    setIsLoading(true);

    try {
    } catch (error) { }
  };

  const handleAddMobil = () => {
    navigate("/mobil/tambah");
  };
  return (
    <section className="min-h-screen">
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Button
            text="+ Tambah mobil"
            type="button"
            width="195"
            height="48"
            onButoonClick={handleAddMobil}
          />
        </div>
      </div>
      <div className="pt-4">
        <div className="bg-white rounded-md p-4">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-center font-semibold bg-gray-100">
                <th className="py-3">Tipe Mobil</th>
                <th className="py-3">Jumlah Kursi</th>
                <th className="py-3 w-56">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-2 px-4">Toyota HiAce</td>
                  <td className="p-2">16</td>
                  <td className="p-2 flex flex-row items-center justify-center gap-4">
                    <Button text={'edit'} className={"h-8"} icon={<FaRegPenToSquare />} />
                    <Button text={'delete'} className={"h-8"} color="red" icon={<FaTrash />} />
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

export default Mobil;
