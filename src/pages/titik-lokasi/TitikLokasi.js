import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const TitikLokasi = () => {
  return (
    <section className="min-h-screen">
      <div className="">
        <SearchInput />
        <div className="pt-[29px]">
          <Link to="/titik/tambah">
            <Button text="+ Tambah" type="button" width="195" height="48" />
          </Link>
        </div>
      </div>
      <div className="pt-4">
        <div>
          <table className="table-auto w-full text-sm">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="p-4">Titik Penjemputan</th>
                <th className="p-4">Cabang</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-4 px-4">Kantor Cabang Ramatranz</td>
                  <td className="p-4 px-4">Lampung</td>
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
