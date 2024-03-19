import React from 'react'
// import { Search } from './index';
import { text } from "../../utils/constant";
import { Province } from '../../components';
import { List, Pagination } from "./index";
// import { location } from '../../utils/constant';
import { useSearchParams } from "react-router-dom";


const HomePage = () => {

    const [ params ] = useSearchParams();
    // console.log(params.get("page"));

    return (
        <div className='border border-red-500 w-full flex flex-col gap-3'>
            {/* <Search /> */}
            <div>
                <h1 className='text-[28px] font-bold' >{text.HOME_TITLE}</h1>
                <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>

            <Province />

            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List />
                    <Pagination 
                        number={params.get("page")}
                    />

                    <div className='h-[500px]'>

                    </div>
                </div>

                <div className='w-[30%] border border-green-500'>
                    Side bar
                </div>
            </div>
            


        </div>
    )
}

export default HomePage