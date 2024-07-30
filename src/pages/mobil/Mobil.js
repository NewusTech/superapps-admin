import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Mobil = () => {
  const [mobil, setMobil] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const getMobil = async ()=> {
    setIsLoading(true);

    try {
      
    } catch (error) {
      
    }
  }
  return (
    <section className="min-h-screen">
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Link to="/mobil/tambah">
            <Button text="+ Tambah mobil" type="button" width="195" height="48" />
          </Link>
        </div>
      </div>
      <div className="pt-4">
        <div className="bg-white">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="p-5">Tipe Mobil</th>
                <th className="p-5">Jumlah Kursi</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-5 px-4">Toyota HiAce</td>
                  <td className="p-5">16</td>
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
