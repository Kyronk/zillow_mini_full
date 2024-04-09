import React, { memo } from 'react'

const Select = ({ 
    label, 
    options = [],
    value,
    setValue,
    type,
    reset,
    name,
    invalidFields,
    setInvalidFields,


}) => {
    // console.log(options);

    const handleErrorText = () => {
        // let textError = "";
        let nameInvalid = invalidFields?.find(item => item.name === name);
        let addressInvalid = invalidFields?.find(item  => item.name ===  "address");


        return `${nameInvalid ? nameInvalid.message : ""}` || `${addressInvalid ? addressInvalid.message : ""}`
        // return textError;
    };

    return (
        <div className='flex flex-col gap-2 flex-1'>
            <label className='font-medium' htmlFor="select-address">{label}</label>
            <select 
                value={reset ? "" : value} 
                // onChange={(e) => setValue(e.target.value)} 
                onChange={(e) => !name ? setValue(e.target.value) : setValue(prev => ({ ...prev, [name]: e.target.value}))} 
                onFocus={() => setInvalidFields([])}
                id="select-address" 
                className='outline-none border border-gray-300 p-2 rounded-md w-full'  
                
                >
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
                                            item?.district_id :
                                                type === "ward" ? item?.ward_id :
                                                    item?.code }
                            >
                                {/* {type === "province" ? item?.province_name : item?.district_name} */}
                                {type === "province" ?
                                    item?.province_name : 
                                        type === "district" ? 
                                            item?.district_name : 
                                                type === "ward" ? item?.ward_name :
                                                    item?.value}
                            </option>
                    )
                })}
            </select>
            <small className='text-red-500' >
                {/* Có lỗi */}
                {/* {invalidFields?.some(item => item.name === name) || invalidFields?.some(item => item.name === "address") && invalidFields?.find(item => item.name === name)?.message} */}
                {handleErrorText()}
            </small>
        </div>
    )
}

export default memo(Select);