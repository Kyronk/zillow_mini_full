import React, {memo} from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';

const notActive = "w-[48px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md cursor-pointer";
const active = "w-[48px] h-[48px] flex justify-center items-center bg-[#E13427] text-white hover:bg-gray-300 rounded-md cursor-pointer";


const PageNumber = ({number, currentPage}) => {

    const navigate = useNavigate();
    console.log(currentPage)

    const handleChangePage = () => {
        navigate({
            pathname: "/",
            search: createSearchParams({
                page: number
            }).toString()
        })
    }


    return (
        <div 
            className={+number === +currentPage ? active : notActive}
            onClick={handleChangePage}
            >
            {number}
        </div>
    )
}

export default memo(PageNumber);