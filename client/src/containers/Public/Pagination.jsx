import React from 'react'
import { PageNumber } from '../../components'
import { useSelector } from "react-redux";


const Pagination = ({ number}) => {

    const { count, posts } = useSelector(state => state.post);
    
    const handlePageNumber = () => {
        let max = Math.floor(count / posts?.length);
        let arrNumber = [];

        for (let i = 1; i <= max; i++) {
            arrNumber.push(i)
        };

        return arrNumber
    };
    // console.log(handlePageNumber());

    return (
        <div className='flex items-center justify-center gap-2 py-5'>
            {handlePageNumber().length > 0 && handlePageNumber().map(item => {
                return (
                    <PageNumber 
                        key={item}
                        number={item}
                        currentPage={number || 1}
                    />
                )
            })}

            <PageNumber number={"..."} />
            <PageNumber number={">>"} />
            
        </div>
    )
}

export default Pagination