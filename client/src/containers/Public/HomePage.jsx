import React from 'react'
import { Search } from './index';
import { text } from "../../utils/constant";
import { ProvinceBtn } from '../../components';
import { location } from '../../utils/constant';

const HomePage = () => {
    return (
        <div className='border border-red-500 w-full flex flex-col gap-3'>
            <Search />
            <div>
                <h1 className='text-[28px] font-bold' >{text.HOME_TITLE}</h1>
                <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            
            <div className='flex items-center gap-5 justify-center py-5 shadow-md'>
                {location.map(item => {
                    return (
                        <ProvinceBtn 
                            key={item.id}
                            image={item.image}
                            name={item.name}
                        />
                    )
                })}

            </div>
        </div>
    )
}

export default HomePage