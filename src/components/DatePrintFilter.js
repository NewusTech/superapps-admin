import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as IconPrint } from '../assets/icons/Print.svg';
import { ReactComponent as IconCalendar } from '../assets/icons/calendar.svg';


const DatePrintFilter = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="flex items-center space-x-2">
            <div className="flex items-center border border-main rounded-md px-2 py-1 text-xs">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="outline-none w-20 text-main"
                />
                <IconCalendar />
            </div>
            <span className='text-sm text-main'>to</span>
            <div className="flex items-center text-xs border px-2 py-1 border-main rounded-md">
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="outline-none w-20 text-main"
                />
                <IconCalendar />
            </div>
            <button className="flex items-center space-x-1 text-xs text-main border border-main rounded px-2 py-1">
                <IconPrint />
                <span>Print</span>
            </button>
        </div>
    );
};

export default DatePrintFilter;
