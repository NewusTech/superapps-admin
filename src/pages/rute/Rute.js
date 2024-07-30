import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { getAllRute } from '../../service/api';

const Rute = () => {
  const [rute, setRute] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getRute = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRute();
      setRute(response?.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }
  console.log(rute)

  useEffect(() => {
    getRute();
  }, [])
  return (
    <section className="min-h-screen">
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Link to="/rute/tambah">
            <Button text="+ Tambah Rute" type="button" width="195" height="48" />
          </Link>
        </div>
      </div>
      <div className="pt-4">
        {
          isLoading ? (
            <Loading />
          ) :
            <div>
              <table className="table-auto w-full text-xs">
                <thead>
                  <tr className="text-center bg-gray-100">
                    <th className="p-3">Dari</th>
                    <th className="p-3">Ke</th>
                    <th className="p-3">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rute.length === 0 ? (
                      <tr>
                        <td colSpan={10}>
                          <p className="text-lg mt-5 font-light text-center">Data Kosong</p>
                        </td>
                      </tr>
                    ) :
                      rute.map(
                        (item, index) => (
                          <tr key={index} className="border-b text-center">
                            {/* <td className="p-3">{item.id}</td> */}
                            <td className="p-3 px-4">{item.kota_asal}</td>
                            <td className="p-3">{item.kota_tujuan}</td>
                            <td className="p-3">Rp.{item.harga?.toLocaleString("id-ID")}</td>
                          </tr>
                        )
                      )
                  }
                </tbody>
              </table>
            </div>
        }
      </div>
    </section>
  );
};

export default Rute;
