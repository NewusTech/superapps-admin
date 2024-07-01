import { useState } from 'react';

function Switch() {
    const [toggleActive, setToggleActive] = useState(false);

    const handleToggleActive = () => {
        setToggleActive(!toggleActive);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex justify-center items-center mt-4">
                <div className={`w-14 h-7 flex items-center rounded-full mx-3 px-1 ${toggleActive ? 'bg-main' : 'bg-secondary'}`}
                    onClick={handleToggleActive}>
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform ${toggleActive ? 'translate-x-7' : 'translate-x-0'} transition duration-200 ease-in-out`}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Switch;