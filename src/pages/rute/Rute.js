import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const orders = [
  { dari: 'Lampung', ke: 'Palembang', jamBerangkat: '08.00', harga: '350.000' },
  { dari: 'Lampung', ke: 'Palembang', jamBerangkat: '08.00', harga: '350.000' },
  { dari: 'Lampung', ke: 'Palembang', jamBerangkat: '08.00', harga: '350.000' },
  { dari: 'Lampung', ke: 'Palembang', jamBerangkat: '08.00', harga: '350.000' },
  { dari: 'Lampung', ke: 'Palembang', jamBerangkat: '08.00', harga: '350.000' },
  { dari: 'Jakarta', ke: 'Lampung', jamBerangkat: '08.00', harga: '250.000' },
  { dari: 'Jakarta', ke: 'Lampung', jamBerangkat: '08.00', harga: '250.000' },
  { dari: 'Jakarta', ke: 'Lampung', jamBerangkat: '08.00', harga: '250.000' },
  { dari: 'Jakarta', ke: 'Lampung', jamBerangkat: '08.00', harga: '250.000' },
  { dari: 'Jakarta', ke: 'Lampung', jamBerangkat: '08.00', harga: '250.000' },
];

const Rute = () => {
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
        <div>
          <table className="table-auto w-full text-xs">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="p-3">Dari</th>
                <th className="p-3">Ke</th>
                <th className="p-3">Jam Berangkat</th>
                <th className="p-3">Harga</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((_, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-3 px-4">{_.dari}</td>
                  <td className="p-3">{_.ke}</td>
                  <td className="p-3">{_.jamBerangkat}</td>
                  <td className="p-3">{_.harga}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Rute;
