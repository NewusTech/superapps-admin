import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import { ReactComponent as IconPrint } from '../../assets/icons/Print.svg';
const Mobil = () => {
    return (
        <>
            <div className="">
                <SearchInput />
                <div className="pt-[29px]">
                    <Button text="+ Tambah mobil" type='button' width="195" height="48" />
                </div>
            </div>
            <div className="pt-4">
                <div>
                    <table className="table-auto w-full text-xs">
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
        </>
    )
}

export default Mobil;