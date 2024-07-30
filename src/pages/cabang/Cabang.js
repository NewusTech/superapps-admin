import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { getAllCabang } from '../../service/api';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';

const Cabang = () => {
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

  useEffect(() => {
    getCabang();
  }, [])

  return (
    <section className="min-h-screen">
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Link to="/cabang/tambah">
            <Button text="+ Tambah Rute" type="button" width="195" height="48" />
          </Link>
        </div>
      </div>
      <div className="pt-4 bg-white mt-10">
        { 
        isLoading ? (
          <Loading />
        ):
        <div>
          <table className="table-auto w-72 text-xs">
            <thead className="border-b">
              <tr className="text-center">
                <th className="pb-3 px-4">Cabang</th>
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
                <tr key={index} className="text-center">
                  <td className="p-3 px-4">{item.nama}</td>
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
