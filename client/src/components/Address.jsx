import React from 'react'
import { Select } from "../components/";


const Address = () => {
    return (
        <div >
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê: </h2>

            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select label="Tỉnh / Thành phố" />
                    <Select label="Quận / Huyện" />

                </div>

                    {/* dia chi chinh xac */}
                    <input type="text" readOnly className='outline-none border border-gray-200 rounded-md bg-gray-100 p-2 w-full'  />
            </div>
        </div>
    )
}

export default Address