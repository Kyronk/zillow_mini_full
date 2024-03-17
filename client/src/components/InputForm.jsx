import React, {memo} from 'react'

const InputForm = ({
    label,
    value,
    setValue,
    type,
    invalidFields,
    setInvalidFields
}) => {
    // console.log( Array.isArray(invalidFields) )
    return (
        <div>
            <label htmlFor="phone" className='text-xs'>{label}</label>
            <input 
                type="text"
                id="phone"
                className='outline-none bg-[#e8f0f3] p-2 rounded-md w-full'
                value={value}
                // onChange={(e) => setValue(e.target.value)}
                onChange={(e) => setValue(prev => ({...prev, [type]: e.target.value}))}
                />

                {/* {invalidFields.length > 0 && invalidFields.some(i => i.name === type) && <small className='text-red-500'>{invalidFields.find(i => i.name = type)?.message}</small>} */}
        </div>
    )
}

export default memo(InputForm);