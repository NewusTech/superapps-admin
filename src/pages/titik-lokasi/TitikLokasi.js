import SearchInput from '../../components/Search';
import Button from '../../components/Button';

const TitikLokasi = () => {
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
                    <table className="table-auto w-96 text-xs">
                        <thead>
                            <tr className="text-center bg-gray-100">
                                <th className="p-3">Titik Penjemputan</th>
                                <th className="p-3">Cabang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="border-b text-center">
                                    <td className="p-3 px-4">Kantor Cabang Ramatranz</td>
                                    <td className="p-3 px-4">Lampung</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TitikLokasi;