import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import Filter from '../../components/Filter';
import { ReactComponent as IconPrint } from '../../assets/icons/Print.svg';
import DatePrintFilter from '../../components/DatePrintFilter';

const Paket = () => {
    return (
        <>
            <div className="">
                <SearchInput />
                <div className="pt-[29px]">
                    <Button text="+ Tambah" type='button' width="195" height="48" />
                </div>
                <div className="flex justify-between">
                    <div className="space-x-1 flex items-center pt-4">
                        <Filter active={false} />
                    </div>
                    <div className="flex items-end">
                        <DatePrintFilter />
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <div>
                    <table className="table-auto w-full text-xs">
                        <thead>
                            <tr className="text-left bg-gray-100">
                                <th className="p-3">Nama Pengirim</th>
                                <th className="p-3">Nama Penerima</th>
                                <th className="p-3">Jenis</th>
                                <th className="p-3">Total Berat</th>
                                <th className="p-3">Biaya</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(8)].map((_, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-1 px-4">Yulivia</td>
                                    <td className="p-1">Dila Azzahra</td>
                                    <td className="p-1">Makanan</td>
                                    <td className="p-1">1 kg</td>
                                    <td className="p-1">24.000</td>
                                    <td className="p-2">
                                        <button>
                                            <IconPrint stroke="#0705EC" />
                                        </button>
                                    </td>
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
    );
};

export default Paket;
