import React, { memo } from 'react'

const Button = ({
    text,
    textColor,
    bgColor,
    IcAfter,
    onClick,
    fullWidth,
    px
}) => {
    // console.log("re render")


    return (
        <button 
            type='button'
            className={`py-2 ${px ? px : "px-2"} ${textColor} ${bgColor} ${fullWidth && "w-full"} outline-none rounded-md hover:underline flex justify-center items-center gap-1`}
            onClick={onClick}
        >
            <span>{text}</span> 
            <span>{IcAfter && <IcAfter />}</span>
        </button>
    )
}

export default memo(Button);