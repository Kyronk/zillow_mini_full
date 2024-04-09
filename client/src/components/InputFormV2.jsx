import React from 'react'

const InputFormV2 = ({ label, unit, value, setValue, name, small, invalidFields, setInvalidFields  }) => {

    const handleErrorText = () => {
        // let textError = "";
        let nameInvalid = invalidFields?.find(item => item.name === name);
        let addressInvalid = invalidFields?.find(item  => item.name ===  "address");


        return `${nameInvalid ? nameInvalid.message : ""}` || `${addressInvalid ? addressInvalid.message : ""}`
        // return textError;
    };

    return (
        <div>
            <label htmlFor="title">{label}</label>
            <div className='flex items-center'>
                <input 
                    type="text" 
                    id="title" 
                    className={`${unit ? 'rounded-tl-md rounded-bl-md ' : "rounded-md"} w-full outline-none border border-gray-300 p-2`} 
                    value={value}
                    onChange={(e) => setValue(prev => ({...prev, [name]: e.target.value}))}
                    onFocus={() => setInvalidFields([])}

                    />
                {unit && <span className='p-2 flex-none w-16 border bg-gray-200 flex items-center justify-center rounded-tr-md rounded-br-md'>{unit}</span>}
            </div>
            {small && <small className='opacity-70 whitespace-nowrap' >{small}</small>}
            <small className='text-red-500 block'>
                {invalidFields?.some(item => item.name === name) && invalidFields?.find(item => item.name === name)?.message}
            </small>
        </div>
    )
}

export default InputFormV2