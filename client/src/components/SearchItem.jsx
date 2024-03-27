import React from 'react'
// import { Modal  } from "./Modal";


const SearchItem = ({
    iconBefore,
    iconAfter,
    text,
    fontWeight,
    defaultText,
}) => {
    return (
        <div className='bg-white py-2 px-4 w-full rounded-md text-gray-500 text-sm flex items-center justify-between'>
            <div className='flex items-center gap-1'>
                {iconBefore}
                {/* <span className={fontWeight && "font-medium text-black"}>{text}</span> */}
                
                <span className={`${fontWeight && 'font-medium text-black'} w-[100px] ${text ? "font-medium text-black" : ""} overflow-hidden text-ellipsis whitespace-nowrap`}>{text || defaultText}</span>

            </div>
            {iconAfter}
        </div>
    )
}

export default SearchItem