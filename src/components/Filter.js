import React from 'react';
import { ReactComponent as IconFilter } from '../assets/icons/ic_filter.svg'

const Filter = (active) => {
    return (
        <button className='text-sm rounded w-[40px] h-[40px]  bg-white text-main border border-main transition duration-300'>
            <div className="flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_165_109)">
                        <path d="M18.3333 2.22217H1.66664C1.5193 2.22217 1.37799 2.2807 1.2738 2.38489C1.16962 2.48907 1.11108 2.63038 1.11108 2.77772V3.7055C1.11119 3.83672 1.13726 3.96661 1.18779 4.08771C1.23833 4.2088 1.31233 4.31869 1.40553 4.41106L7.77775 10.8777V16.5444L8.88886 16.9666V10.5555C8.88929 10.4824 8.87527 10.4099 8.84762 10.3422C8.81998 10.2745 8.77924 10.213 8.72775 10.1611L2.2222 3.66106V3.33328H17.7778V3.67217L11.2944 10.1611C11.2389 10.2111 11.194 10.2718 11.1625 10.3396C11.131 10.4074 11.1135 10.4808 11.1111 10.5555V17.8944L12.2222 18.3333V10.8333L18.5944 4.44439C18.6891 4.34968 18.764 4.23701 18.8145 4.11299C18.8651 3.98897 18.8904 3.85609 18.8889 3.72217V2.77772C18.8889 2.63038 18.8303 2.48907 18.7261 2.38489C18.622 2.2807 18.4806 2.22217 18.3333 2.22217Z" fill="#0705EC" />
                    </g>
                    <defs>
                        <clipPath id="clip0_165_109">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </button>
    )
}

export default Filter;