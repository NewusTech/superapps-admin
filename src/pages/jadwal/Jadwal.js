import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import '../../index.css';
const Jadwal = () => {
    return (
        <div className=''>
            <h1 className='mb-5'>Jadwal</h1>
            <Calendar className="w-[920px] border-2 border-slate-500 text-gray-700 font-poppins" tileClassName={`h-20 ps-4 text-left border border-slate-500 flex text-gray-700`} />
        </div>
    )
}

export default Jadwal;