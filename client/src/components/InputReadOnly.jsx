import React from 'react'

const InputReadOnly = ({label, value}) => {
    return (
        <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor="exactly-address">{label}</label>
            <input 
                type="text" 
                readOnly 
                className='outline-none border border-gray-200 rounded-md bg-gray-100 p-2 w-full'
                id="exactly-address"
                value={value || ""}
                />
        </div>
    )
}

export default InputReadOnly