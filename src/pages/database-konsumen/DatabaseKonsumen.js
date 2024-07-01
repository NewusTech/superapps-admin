import Filter from '../../components/Filter';
import SearchInput from '../../components/Search';
import { ReactComponent as IconPrint } from '../../assets/icons/Print.svg';
import DatePrintFilter from '../../components/DatePrintFilter';

const DatabaseKonsumen = () => {
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
                <div>
                    <table className="table-auto w-full text-xs">
                        <thead>
                            <tr className="text-left bg-gray-100">
                                <th className="p-3">Nama</th>
                                <th className="p-3">Tanggal</th>
                                <th className="p-3">Nomor Telepon</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Titik Jemput</th>
                                <th className="p-3">Titik Antar</th>
                                <th className="p-3">Jumlah pesan</th>
                                <th className="p-3">Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(8)].map((_, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2 px-4">Dila Azzahra</td>
                                    <td className="p-2">24-01-2024</td>
                                    <td className="p-2">089587654321</td>
                                    <td className="p-2">dilaaz@example.com</td>
                                    <td className="p-2">Loket Ramatranz</td>
                                    <td className="p-2">Jl. Pangeran Antasari</td>
                                    <td className="p-2 text-center">1</td>
                                    <td className="p-2">250.000</td>
                                    <td className="p-2">+</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between text-sm mt-2">
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

export default DatabaseKonsumen;