import React, { useState, useEffect, memo } from 'react'
import icon from "../utils/icons";
import { FaChessKing } from 'react-icons/fa6';
import { getNumbersPrice, getNumbersArea } from '../utils/Common/getNumbers';
import { getCodes, getCodesArea } from '../utils/Common/getCode';

const { GrLinkPrevious } = icon;

const Modal = ({
    setIsShowModal,
    content,
    name,
    handleSubmit,
    queries,
    arrMinMax,
    defaultText,
}) => {

    // console.log(arrMinMax)

    // const [ persent1, setPersent1 ] = useState(arrMinMax[0] || 0);
    // const [ persent2, setPersent2 ] = useState(arrMinMax[1] || 100);
    const [persent1, setPersent1] = useState(name === 'price' && arrMinMax?.priceArr
        ? arrMinMax?.priceArr[0]
        : name === 'area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[0] : 0);

    const [persent2, setPersent2] = useState(name === 'price' && arrMinMax?.priceArr
        ? arrMinMax?.priceArr[1]
        : name === 'area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[1] : 100);

    // const [ persent1, setPersent1 ] = useState(name === 'price'  ? arrMinMax?.priceArr[0] : name === 'area'  ? arrMinMax?.areaArr[0] : 0);

    // const [ persent2, setPersent2 ] = useState(name === 'price' ? arrMinMax?.priceArr[1] : name === 'area' ? arrMinMax?.areaArr[1] : 100);
    
    // const [ persent1, setPersent1 ] = useState(name === "price" && arrMinMax?.price ? arrMinMax?.priceArr[0] : name === "area" && arrMinMax?.area ? arrMinMax?.areaArr[0] : 0);
    // const [ persent2, setPersent2 ] = useState(name === "price"  ? arrMinMax?.priceArr[1] : name === "area" ? arrMinMax?.areaArr[1] : 100);
    // const [ persent1, setPersent1] = useState(0);
    // const [ persent2, setPersent2] = useState(100);

    const [ activedEl, setActivedEl ] = useState("");

    useEffect(() => {
        const activatedTrackEl = document.getElementById("track-active");
        if(activatedTrackEl) {
            if (persent2 <= persent1) {
                activatedTrackEl.style.left = `${persent2}%`;
                activatedTrackEl.style.right = `${100 - persent1}%`;
            } else {
                activatedTrackEl.style.left = `${persent1}%`;
                activatedTrackEl.style.right = `${100 - persent2}%`;
            }
        }

    }, [persent1, persent2]);



    const handleClickTrack = (e, value) => {
        // const activatedTrackEl = document.getElementById("track-active");
        // e.stopPropagation();
        const stackEl = document.getElementById("track");
        const stackRect = stackEl.getBoundingClientRect();
        let percent = value ? value : Math.round((e.clientX - stackRect.left) * 100/ stackRect.width);
        if (Math.abs(percent - persent1) <= (Math.abs(percent - persent2))) {
            // activatedTrackEl.style.left = `${persent1}%`;
            setPersent1(percent);
        } else {
            // activatedTrackEl.style.right = `${100 - persent2}`;
            setPersent2(percent);
        }
        // console.log(stackEl);
    };

    const convert100toTarget = (percent) => {
        // logic code 
        // ở đây có các mức giá từ 0 đến 15tr
        // giá trị lấy là 0 0.5 1 1.5 2 2.5 .... 15
        // 0 -100 => 100 giá trị 
        // 0 -15 => 30 giá trị
        // 30/100 = 0.3

        // 10% => 3
        // 9% => 2.7 * 10 => 27 / 5 dư 2 => 6 * 25 = 30 / 10 = 3

        // return (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10;
        // let target = name === "price" ? 1.5 : name === "area" ? 9 : 1 ;
        // return (Math.ceil(Math.round((percent * target)) / 5) * 5) / 10;
        return name === "price"
            ? (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
            : name === "area"
                ? (Math.ceil(Math.round((percent * 0.9)) / 5 ) * 5)
                : 0 ;

    };
    const convertTo100 = (percent) => {
        // return Math.round((percent/15) * 100);
        let target = name === "price" ? 15 : name === "area" ? 90 : 1 ;
        return Math.round((percent / target) * 100);
    };
    
    // const getNumbersPrice = (string) => string.split(" ").map(item => +item).filter(item => !item === false);    
    // const getNumbersPriceArea = (string) => string.split(" ").map(item => +item.match(/\d+/)).filter(item => item !== 0);

    const handleActive  = (code, value) => {
        setActivedEl(code);
        // let arrMaxMin = getNumbersPrice(value);
        let arrMaxMin = name === "price" ? getNumbersPrice(value) : getNumbersArea(value)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setPersent1(0);
                setPersent2(convertTo100(1));
            }

            if (arrMaxMin[0] === 20) {
                setPersent1(0);
                setPersent2(convertTo100(20))
            }

            if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setPersent1(100);
                setPersent2(100);
            }
        }
        if (arrMaxMin.length === 2) {
            setPersent1(convertTo100(arrMaxMin[0]));
            setPersent2(convertTo100(arrMaxMin[1]));
        }
    };

    const handleBeforeSubmit = (e) => {

        let min = persent1 <= persent2 ? persent1 : persent2;
        let max = persent1 <= persent2 ? persent2 : persent1;
        // let arrMinMax = [convert100toTarget(min), convert100toTarget(max)];
        let arrMinMax = (persent1 === persent2 && persent1 === 100) ?  [convert100toTarget(min), 9999] : [convert100toTarget(min), convert100toTarget(max)];
        

        // const gaps = name === 'price'
        //     // ? getCodes([convert100toTarget(persent1), convert100toTarget(persent2)], content)
        //     ? getCodes(arrMinMax, content)
        //     : name === "area" ? getCodesArea(arrMinMax, content) : []
        

        handleSubmit(e, {
            [`${name}Number`] : arrMinMax,
            // [name]: `Từ ${convert100toTarget(min)} - ${convert100toTarget(max)} ${name === "price" ? "Triệu" : "m2" }` 
            [name] : `Từ ${convert100toTarget(min)}${(persent1 === persent2 && persent1 === 100) 
            ? "" 
            : `- ${convert100toTarget(max)}` } ${name === "price" ? "Triệu" : "m2"} ${(persent1 === persent2 && persent1 === 100) ? "trở lên": ""}`
        }, {
            [`${name}Arr`]: [min, max]
            // [`${name}Arr`]: (persent1 === persent2 && persent1 === 100)? [min, 9999] : [min, max]
            

        });
    }



    return (
        <div   
            // chỗ này là thằng cha nên, bắm vô chỗ blur là nó tắt modal
            onClick={(e) => {
                e.stopPropagation(); // cái này có cũng đc không có cũng được
                setIsShowModal(false);
            }}
            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center'
        >
            <div 
                onClick={(e) => {
                    e.stopPropagation(); // cái này là thằng con (phần content) bắm vào không được phép tắt
                    setIsShowModal(true); // giữ nguyên trạng thái của modal show
                }}
                className='w-2/5 h-[500px] bg-white rounded-md relative'>
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
                        <span className='py-2 flex gap-2 items-center border-b border-gray-200'>
                            <input
                                type="radio"
                                name={name}
                                value={defaultText || ''}
                                id='default'
                                checked={!queries[`${name}Code`] ? true : false}
                                onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })} // chỗ null nếu đẻ v thì nó k hiện trên queries còn để "" thì nó vẫn gọi api
                                
                            />
                            <label htmlFor='default'>{defaultText}</label>
                        </span>
                        {content?.map(item => {
                            return (
                                <span key={item.code} className="py-2 flex gap-2 items-center border-b border-gray-200">
                                    <input 
                                        type="radio" 
                                        name={name} 
                                        id={item.code} 
                                        value={item.code}  
                                        //  checked đi với onChange ở type radio
                                        checked={item.code === queries[`${name}Code`] ? true : false}
                                        onChange={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code})} 
                                        
                                        />
                                    <label htmlFor={item.code}>{item.value}</label>
                                </span>
                            )
                        })
                        }
                    </div>
                }

                {(name === "price" || name === "area") && 
                <div className='p-12 py-20'>
                    <div className='flex flex-col items-center justify-center relative'>
                        <div className='z-30 absolute top-[-48px] font-bold text-xl text-orange-600'>
                            {/* Từ 0 - 15 triệu + */}
                            {/* {`${(persent1 === 100 && persent2 === 100) ? "Trên" : "Từ"} ${persent1 <= persent2 
                                ? convert100toTarget(persent1) 
                                : convert100toTarget(persent2)} - ${persent2 >= persent1 
                                ?  convert100toTarget(persent2) 
                                : convert100toTarget(persent1)} ${name === "price" 
                                    ? "triệu" 
                                    : "m2"}`} */}

                            {(persent1 === 100 && persent2 === 100)
                                ? `Trên ${convert100toTarget(persent1)} ${name === 'price' ? 'triệu' : 'm2'} +`
                                : `Từ ${persent1 <= persent2
                                    ? convert100toTarget(persent1)
                                    : convert100toTarget(persent2)} - ${persent2 >= persent1
                                        ? convert100toTarget(persent2)
                                        : convert100toTarget(persent1)} ${name === 'price'
                                            ? 'triệu'
                                            : 'm2'}`}
                        </div>
                        <div  onClick={handleClickTrack} id="track" className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full'></div>
                        <div onClick={handleClickTrack} id="track-active" className='slider-track-active h-[5px] absolute top-0 bottom-0  bg-orange-600 rounded-full'></div>
                        
                        <input 
                            max="100"
                            min="0"
                            step="1"
                            type="range"
                            value={persent1}
                            className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                            onChange={(e) => {
                                setPersent1(+e.target.value);
                                activedEl && setActivedEl("");
                            }}
                        />

                        <input 
                            max="100"
                            min="0"
                            step="1"
                            type="range"
                            value={persent2}
                            className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                            onChange={(e) => {
                                setPersent2(+e.target.value);
                                activedEl && setActivedEl("");
                                
                            }}
                        />

                        <div className='absolute z-30 top-6 left-0 right-0 flex justify-between items-center'>
                            <span
                                className='cursor-pointer'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickTrack(e, 0);
                                }}
                            >
                                {name === "price" ? 0 : name === "area" ?  0: ""}
                            </span>
                            <span 
                                className='mr-[-12px] cursor-pointer'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickTrack(e, 100);
                                }}
                                >
                                    {name === "price" ? "15 Triệu +" : name === "area" ? "Trên 90 m2" : ""}
                                </span>
                        </div>

                    </div>
                        
                    {/*  default value */}
                    <div className='mt-24'>
                        <h4 className='font-medium mb-4'>Chọn nhanh:</h4>
                        <div className='flex gap-2 items-center flex-wrap w-full'>
                            {content?.map(item => {
                                return (
                                    <button
                                        key={item.code}
                                        // onClick={() => setActivedEl(item.code)}
                                        onClick={() => handleActive(item.code, item.value)}
                                        className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${item.code === activedEl ? "bg-blue-500 text-white": ""}`}
                                    >
                                        {item.value}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                        
                </div>

                }
                {(name === "price" || name === "area") && 
                    <button
                        type='button'
                        className='w-full bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md absolute bottom-0'
                        // onClick={(e) => handleSubmit(e, { start: convert100toTarget(persent1), end : convert100toTarget(persent2)})}
                        // onClick={(e) => handleSubmit(e, {
                        //     [`${name}Code`]: [ convert100toTarget(persent1),convert100toTarget(persent2)],
                        //     [name]: `Từ ${convert100toTarget(persent1)} - ${convert100toTarget(persent2)} ${name === "price" ? "Triệu" : "m2"}`
                        // })}
                        onClick={handleBeforeSubmit}
                        >
                        ÁP DỤNG
                    </button>
                }
            </div>

        </div>
    )
}

export default memo(Modal);