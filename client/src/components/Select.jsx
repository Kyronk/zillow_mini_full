import React, { memo } from 'react'

const Select = ({ 
    label, 
    options = [],
    value,
    setValue,
    type,
    reset,

}) => {
    // console.log(options);


    return (
        <div className='flex flex-col gap-2 flex-1'>
            <label className='font-medium' htmlFor="select-address">{label}</label>
            <select value={reset ? "" : value} onChange={(e) => setValue(e.target.value)} id="select-address" className='outline-none border border-gray-300 p-2 rounded-md w-full'  >
                {/* <option value="">--Chọn tỉnh thành--</option> */}
                <option value="" >{`--Chọn ${label}--`}</option>
                {options?.map((item, index) => {
                    return (
                        <option 
                            // key={type === "province" ? item?.province_id : item?.district?.id} 
                            key={index}
                            value={
                                type === "province" ?
                                    item?.province_id : 
                                        type === "district" ? 
                                            item?.district_id : item?.ward_id}
                            >
                                {/* {type === "province" ? item?.province_name : item?.district_name} */}
                                {type === "province" ?
                                    item?.province_name : 
                                        type === "district" ? 
                                            item?.district_name : item?.ward_name}
                            </option>
                    )
                })}
            </select>
        </div>
    )
}

export default memo(Select);