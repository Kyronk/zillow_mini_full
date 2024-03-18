import React, {memo} from 'react'

const InputForm = ({
    label,
    value,
    setValue,
    keyPayload,
    type,
    invalidFields,
    setInvalidFields,
}) => {
    console.log( invalidFields?.length )
    return (
        <div>
            <label htmlFor="phone" className='text-xs'>{label}</label>
            <input 
                type={type || "text"}
                id="phone"
                className='outline-none bg-[#e8f0f3] p-2 rounded-md w-full'
                value={value}
                // onChange={(e) => setValue(e.target.value)}
                onChange={(e) => setValue(prev => ({...prev, [keyPayload]: e.target.value}))}
                onFocus={() => setInvalidFields([]) }
                />

                {invalidFields?.length > 0 && invalidFields.some(i => i.name === keyPayload) && <small className='text-red-500'>{invalidFields.find(i => i.name === keyPayload)?.message}</small>}
            {/* {invalidFields.length > 0 && invalidFields.some(i => i.name === keyPayload) && <small className='text-red-500 italic' >{invalidFields.find(i => i.name === type)?.message}</small>} */}

        </div>
    )
}

export default memo(InputForm);