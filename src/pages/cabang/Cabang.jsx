import SearchInput from 'components/Search';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCabang } from 'service/api';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";


const Cabang = () => {
  const navigate = useNavigate();
  const [cabang, setCabang] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCabang = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCabang();
      setCabang(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(cabang);

  const handleTambahCabang = () => {
    navigate("/cabang/tambah");
  };

  useEffect(() => {
    getCabang();
  }, [])

  return (
    <section className="min-h-screen">
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Button text="+ Tambah Cabang" type="button" width="195" height="48" onButoonClick={handleTambahCabang} />
        </div>
      </div>
      <div className="mt-10">
        {
          isLoading ? (
            <Loading />
          ) :
            <div className="bg-white rounded-md border w-full xl:w-1/2">
              <table className="w-full text-xs">
                <thead className="border-b">
                  <tr className="text-center h-12 bg-gray-100">
                    <th className="py-1 px-4">Cabang</th>
                    <th className="py-1 w-56">Action</th>
                  </tr>
                </thead>
                {
                  cabang.length <= 0 ? (
                    <tr>
                      <td colSpan={10}>
                        <p className="text-lg mt-5 font-light text-center">Data Kosong</p>
                      </td>
                    </tr>
                  ) : (
                    <tbody>
                      {cabang.map((item, index) => (
                        <tr key={index} className="text-center border-b">
                          <td className="p-3 px-4">{item.nama}</td>
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
                  )}
              </table>
            </div>
        }
      </div>
    </section>
  );
};

export default Cabang;
