import React, { useState } from 'react'
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FiDownload } from 'react-icons/fi';

export default function DatabaseKonsumenItem() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="flex flex-row py-2 border-b gap-4 items-center text-sm cursor-pointer hover:bg-gray-100 duration-150" onClick={() => setOpen((prev) => !prev)}>
                <span className="w-36 text-center">Dila</span>
                <span className="w-36 text-center">24-01-2024</span>
                <span className="w-48 text-center">08xxxxxxx</span>
                <span className="w-36 text-center">Dila@gmail</span>
                <span className="w-52 text-center">Loket Ramatranz</span>
                <span className="w-52 text-center">Jl. Pangeran</span>
                <span className="w-32 text-center">2</span>
                <span className="w-60 text-center">Rp. 750.000</span>
                <span className='w-5 flex items-center justify-center'>
                    {open ? <IoChevronUp /> : <IoChevronDown />}
                </span>
            </div>
            {open && (
                <div className='flex flex-col gap-4 pb-4'>
                    <div className="flex flex-row gap-4 items-center text-sm">
                        <span className="w-36 text-center"></span>
                        <span className="w-36 text-center">24-01-2024</span>
                        <span className="w-48 text-center">08xxxxxxx</span>
                        <span className="w-36 text-center">Dila@gmail</span>
                        <span className="w-52 text-center">Loket Ramatranz</span>
                        <span className="w-52 text-center">Jl. Pangeran</span>
                        <span className="w-32 text-center">1</span>
                        <span className="w-60 text-center">Rp. 750.000</span>
                    </div>
                    <div className="flex flex-row gap-4 items-center text-sm">
                        <span className="w-36 text-center"></span>
                        <span className="w-36 text-center">24-01-2024</span>
                        <span className="w-48 text-center">08xxxxxxx</span>
                        <span className="w-36 text-center">Dila@gmail</span>
                        <span className="w-52 text-center">Loket Ramatranz</span>
                        <span className="w-52 text-center">Jl. Pangeran</span>
                        <span className="w-32 text-center">1</span>
                        <span className="w-60 text-center">Rp. 750.000</span>
                    </div>
                </div>
            )}
        </ >
    )
}
