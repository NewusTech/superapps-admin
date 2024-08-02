import Filter from '../../components/Filter';
import SearchInput from '../../components/Search';
import { ReactComponent as IconPrint } from '../../assets/icons/Print.svg';
import DatePrintFilter from '../../components/DatePrintFilter';

const RiwayatPesanan = () => {
    return (
        <>
            <div>
                <SearchInput />
                <div className="flex justify-between mt-8">
                    <div className="space-x-1 flex items-center pt-4">
                        <Filter active={false} />
                    </div>
                    <div className="flex items-end">
                        <DatePrintFilter />
                    </div>
                </div>
            </div>
            <div className='pt-2'>
                <div className="bg-white rounded-md border my-5">
                    <table className="table-auto w-full text-xs">
                        <thead>
                            <tr className="text-left bg-gray-100 border-b">
                                <th className="p-3">No</th>
                                <th className="p-3">Nama</th>
                                <th className="p-3">Rute</th>
                                <th className="p-3 text-center">Jam Berangkat</th>
                                <th className="p-3">Tanggal</th>
                                <th className="p-3">Mobil</th>
                                <th className="p-3">Supir</th>
                                <th className="p-3">Harga</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Print</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(8)].map((_, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-1 text-center">{index + 1}</td>
                                    <td className="px-3 py-1">Dila Azzahra</td>
                                    <td className="px-3 py-1">Palembang - Lampung</td>
                                    <td className="px-3 py-1 text-center">08:00</td>
                                    <td className="px-3 py-1">24-01-2024</td>
                                    <td className="px-3 py-1">Toyota Hiace</td>
                                    <td className="px-3 py-1">Ridwan</td>
                                    <td className="px-3 py-1">250.000</td>
                                    <td className="px-3 py-1">
                                        <span className="bg-green-100 text-greenColor py-1 px-3 rounded text-xs">Sukses</span>
                                    </td>
                                    <td className="p-3">
                                        <button>
                                            <IconPrint stroke="#0705EC" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between text-sm mt-2 p-4">
                        <div>
                            <p className="text-left font-bold">Pesanan</p>
                            <p className="text-left">Total</p>
                        </div>
                        <div>
                            <p className="text-right font-bold">8</p>
                            <p className="text-right">2.000.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RiwayatPesanan;