import React, { useState, useEffect } from 'react'
import icon from "../utils/icons";
import { FaChessKing } from 'react-icons/fa6';

const { GrLinkPrevious } = icon;

const Modal = ({
    setIsShowModal,
    content,
    name,
}) => {

    const [ persent1, setPersent1 ] = useState(0);
    const [ persent2, setPersent2 ] = useState(100);

    useEffect(() => {
        const activatedTrackEl = document.getElementById("track-active");
        if (persent2 <= persent1) {
            activatedTrackEl.style.left = `${persent2}%`;
            activatedTrackEl.style.right = `${100 - persent1}%`;
        } else {
            activatedTrackEl.style.left = `${persent1}%`;
            activatedTrackEl.style.right = `${100 - persent2}%`;
        }

    }, [persent1, persent2]);

    const handleClickStack = (e) => {
        // const activatedTrackEl = document.getElementById("track-active");
        // e.stopPropagation();
        const stackEl = document.getElementById("track");
        const stackRect = stackEl.getBoundingClientRect();
        let percent = Math.round((e.clientX - stackRect.left) * 100/ stackRect.width);
        if (Math.abs(percent - persent1) <= (Math.abs(percent - persent2))) {
            // activatedTrackEl.style.left = `${persent1}%`;
            setPersent1(percent);
        } else {
            // activatedTrackEl.style.right = `${100 - persent2}`;
            setPersent2(percent);
        }
        // console.log(stackEl);
    };

    const convert100to15 = (percent) => {
        // logic code 
        // ở đây có các mức giá từ 0 đến 15tr
        // giá trị lấy là 0 0.5 1 1.5 2 2.5 .... 15
        // 0 -100 => 100 giá trị 
        // 0 -15 => 30 giá trị
        // 30/100 = 0.3

        // 10% => 3
        // 9% => 2.7 * 10 => 27 / 5 dư 2 => 6 * 25 = 30 / 10 = 3

        return percent * 0.3
    }



    return (
        <div   
            // chỗ này là thằng cha nên, bắm vô chỗ blur là nó tắt modal
            onClick={(e) => {
                e.stopPropagation(); // cái này có cũng đc không có cũng được
                setIsShowModal(false)
            }}
            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center'
        >
            <div 
                onClick={(e) => {
                    e.stopPropagation(); // cái này là thằng con (phần content) bắm vào không được phép tắt
                    setIsShowModal(true); // giữ nguyên trạng thái của modal show
                }}
                className='w-1/3 bg-white rounded-md'>
                <div className='h-[45px] px-4 flex items-center border-b border-gray-200'>
                    <span
                        className='hover:text-red-600 cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation(); 
                            setIsShowModal(false); 
                        }}
                    >
                        <GrLinkPrevious size={24}/>
                    </span>
                </div>

                {(name === "category" || name === "province") && 
                    <div className='p-4 flex flex-col'>
                        {content?.map(item => {
                            return (
                                <span key={item.code} className="py-2 flex gap-2 items-center border-b border-gray-200">
                                    <input type="radio" name={name} id={item.code} value={item.code} />
                                    <label htmlFor={item.code}>{item.value}</label>
                                </span>
                            )
                        })
                        }
                    </div>
                }

                {(name === "price" || name === "area") && <div className='p-12'>
                    <div className='flex flex-col items-center justify-center relative'>
                        <div className='z-30 absolute top-[-48px] font-bold text-xl text-orange-600'>
                            {/* Từ 0 - 15 triệu + */}
                            {`Từ ${persent1 <= persent2 ? persent1 : persent2} - ${persent2 >= persent1 ?  persent2 : persent1} Triệu`}
                        </div>
                        <div  onClick={handleClickStack} id="track" className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full'></div>
                        <div onClick={handleClickStack} id="track-active" className='slider-track-active h-[5px] absolute top-0 bottom-0  bg-orange-600 rounded-full'></div>
                        
                        <input 
                            max="100"
                            min="0"
                            step="1"
                            type="range"
                            value={persent1}
                            className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                            onChange={(e) => setPersent1(+e.target.value)}
                        />

                        <input 
                            max="100"
                            min="0"
                            step="1"
                            type="range"
                            value={persent2}
                            className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                            onChange={(e) => setPersent2(+e.target.value)}
                        />

                        <div className='absolute z-30 top-6 left-0 right-0 flex justify-between items-center'>
                            <span>0</span>
                            <span className='mr-[-12px]'>15 triệu +</span>
                        </div>

                    </div>
                        
                </div>

                }
            </div>
        </div>
    )
}

export default Modal