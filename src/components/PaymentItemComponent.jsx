import React, { useState } from 'react'
import { IoChevronDown, IoChevronUp } from "react-icons/io5"

export default function PaymentItemComponent({ title, icon, itemData }) {
    const [paymentOpen, setPaymentOpen] = useState(true);
    const handleOpen = () => {
        setPaymentOpen((prev) => !prev)
    }
    return (
        <div className="p-4 bg-white flex flex-col gap-4 cursor-default" >
            <div className="flex flex-row gap-4 items-center bg-white" onClick={handleOpen}>
                {icon}
                <p className=''>{title}</p>
                {paymentOpen ? <IoChevronDown size={24} className='ml-auto' /> : <IoChevronUp size={24} className='ml-auto' />}
            </div>
            <div className="" hidden={paymentOpen}>
                <div className="border rounded-md p-4">
                    Gopay
                </div>
            </div>
        </div>
    )
}
