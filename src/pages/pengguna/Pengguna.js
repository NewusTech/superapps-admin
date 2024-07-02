import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Pengguna = () => {
  return (
    <>
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Link to="/pengguna/tambah">
            <Button text="+ Tambah Rute" type="button" width="195" height="48" />
          </Link>
        </div>
      </div>
      <div className="pt-4">
        <div>
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="p-3">Nama</th>
                <th className="p-3">Nomor Telepon</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-3 px-4">Dila</td>
                  <td className="p-3 px-4">08662787236</td>
                  <td className="p-3 px-4">Dila@gmail.com</td>
                  <td className="p-3 px-4">2.000.000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Pengguna;
