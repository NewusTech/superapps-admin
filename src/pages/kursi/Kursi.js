import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import React, { useState } from 'react';
import Switch from '../../components/Switch';

const Kursi = () => {

    return (
        <>
            <div className="">
                <SearchInput />
                <div className="pt-[29px]">
                    <Button text="Setting Kursi" type='button' width="195" height="48" />
                </div>
            </div>
            <div className="pt-4">
                <div>
                    <table className="table-auto w-[560px] text-xs">
                        <thead>
                            <tr className="text-center bg-gray-100">
                                <th className="p-3">Mobil</th>
                                <th className="p-3">Jumlah Kursi Tersedia</th>
                                <th className="p-3">Out of Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="border-b text-center">
                                    <td className="p-3 px-4">Toyota HiAce</td>
                                    <td className="p-3 px-4">10</td>
                                    <td className="p-3 px-4">
                                        <Switch />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Kursi;