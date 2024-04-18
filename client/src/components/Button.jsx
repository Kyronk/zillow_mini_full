import React, { memo } from 'react'

import { FaPhone } from "react-icons/fa6";


const Button = ({
    text,
    textColor,
    bgColor,
    IcAfter,
    onClick,
    fullWidth,
    px,
    IcBefore,
}) => {
    // console.log("re render")


    return (
        <button 
            type='button'
            className={`py-2 ${px ? px : "px-2"} ${textColor} ${bgColor} ${fullWidth && "w-full"} outline-none rounded-md hover:underline flex justify-center items-center gap-1`}
            onClick={onClick}
        >
            {/* {IcBefore && <span><FaPhone /> </span>} */}
            {IcBefore && <span><IcBefore /> </span>}
            <span>{text}</span> 
            <span>{IcAfter && <IcAfter />}</span>
        </button>
    )
}

export default memo(Button);