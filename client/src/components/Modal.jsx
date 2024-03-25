import React from 'react'
import icon from "../utils/icons";

const { GrLinkPrevious } = icon;

const Modal = () => {
    return (
        <div
            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center'
        >
            <div className='w-1/3 bg-white rounded-md'>
                <div className='h-[45px] px-4 flex items-center border-gray-100'>
                    <span>
                        <GrLinkPrevious size={24}/>
                    </span>
                </div>

                <div>
                    content
                </div>
            </div>
        </div>
    )
}

export default Modal