import React from 'react'

const InputFormV2 = ({ label, unit, value, setValue, name, small, invalidFields, setInvalidFields, direction }) => {

    const handleErrorText = () => {
        // let textError = "";
        let nameInvalid = invalidFields?.find(item => item.name === name);
        let addressInvalid = invalidFields?.find(item => item.name === "address");


        return `${nameInvalid ? nameInvalid.message : ""}` || `${addressInvalid ? addressInvalid.message : ""}`
        // return textError;
    };

    return (
        <div className={`flex ${direction ? direction : "flex-col"}`}>
            <label className='w-48 flex-none' htmlFor="title">{label}</label>
            <div className='flex flex-auto  flex-col items-center'>
                <div className='flex w-full items-center'>
                    <input
                        type="text"
                        id="title"
                        className={`${unit ? 'rounded-tl-md rounded-bl-md ' : "rounded-md"} outline-none border flex-auto border-gray-300 p-2`}
                        value={value}
                        onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                        onFocus={() => setInvalidFields([])}

                    />
                    {unit && <span className='p-2 flex-none w-16 border bg-gray-200 flex items-center justify-center rounded-tr-md rounded-br-md'>{unit}</span>}
                </div>

            {invalidFields?.some(item => item.name === name) &&
                <small className='text-red-500 block w-full'>
                    {invalidFields?.find(item => item.name === name)?.message}
                </small>
            }
            </div>

            {small && <small className='opacity-70 whitespace-nowrap' >{small}</small>}
        </div>
    )
}

export default InputFormV2