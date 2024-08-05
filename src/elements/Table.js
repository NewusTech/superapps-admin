import React from "react";
import { ReactComponent as IconPrint } from '../assets/icons/Print.svg'

const Table = () => {
    return (
        <>
            <div>
                <table className="table-auto w-full text-xs">
                    <thead>
                        <tr className="text-left bg-gray-100">
                            <th className="p-3">No</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Rute</th>
                            <th className="p-3">Jam Berangkat</th>
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
                                <td className="p-1">{index + 1}</td>
                                <td className="p-1">Dila Azzahra</td>
                                <td className="p-1">Palembang - Lampung</td>
                                <td className="p-1">08:00</td>
                                <td className="p-1">24-01-2024</td>
                                <td className="p-1">Toyota Hiace</td>
                                <td className="p-1">Ridwan</td>
                                <td className="p-1">250.000</td>
                                <td className="p-1">
                                    {index % 2 === 0 ? (
                                        <span className="bg-green-100 text-greenColor py-1 px-3 rounded text-xs">Sukses</span>
                                    ) : index % 3 === 0 ? (
                                        <span className="bg-red-100 text-redColor py-1 px-3 rounded text-xs">Gagal</span>
                                    ) : (
                                        <span className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded text-xs">Menunggu</span>
                                    )}
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
                <div className="flex justify-between text-sm">
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
        </>
    )
}

export default Table;