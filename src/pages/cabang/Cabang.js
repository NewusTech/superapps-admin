import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Cabang = () => {
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
        <div>
          <table className="table-auto w-72 text-xs">
            <thead className="border-b">
              <tr className="text-center">
                <th className="pb-3 px-4">Cabang</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(2)].map((_, index) => (
                <tr key={index} className="text-center">
                  <td className="p-3 px-4">Lampung</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Cabang;
