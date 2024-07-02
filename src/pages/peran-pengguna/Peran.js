import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Peran = () => {
  return (
    <section className="bg-[#F8F8F8] min-h-screen">
      <div>
        <SearchInput />
        <div className="pt-[29px]">
          <Link to="/peran/tambah">
            <Button text="+ Tambah" type="button" width="295" height="48" />
          </Link>
        </div>
      </div>
      <div className="mt-5 rounded-sm">
        <div className="bg-white">
          <table className="table-auto w-full flex justify-center bg-white">
            <div className="w-[70%] text-center">
              <thead>
                <tr className="text-center">
                  <th className="p-3 font-bold">Role</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-3 px-4">Super Admin</td>
                  </tr>
                ))}
              </tbody>
            </div>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Peran;
