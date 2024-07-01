import SearchInput from '../../components/Search';
import Button from '../../components/Button';

const Rute = () => {
    return (
        <>
            <div className="">
                <SearchInput />
                <div className="pt-[29px]">
                    <Button text="+ Tambah Rute" type='button' width="195" height="48" />
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
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="border-b text-center">
                                    <td className="p-3 px-4">Lampung</td>
                                    <td className="p-3">Palembang</td>
                                    <td className="p-3">08:00</td>
                                    <td className="p-3">250.000</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Rute;
