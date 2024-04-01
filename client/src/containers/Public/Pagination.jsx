import React, { useEffect, useState } from 'react'
import { PageNumber } from '../../components'
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// const arrNumber = [1, 2, 3];

const Pagination = () => {

    const { count, posts } = useSelector(state => state.post);
    const [ arrPage, setArrPage ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isHideEnd, setIsHideEnd ] = useState(false);
    const [ isHideStart, setIsHideStart ] = useState(false);
    const [ searchParams ] = useSearchParams();

    useEffect(() => {
        // let page = searchParams.get('page')
        // page && +page !== currentPage && setCurrentPage(+page)
        // !page && setCurrentPage(1)
        let page = searchParams.get('page')
        page && +page !== currentPage && setCurrentPage(+page)
        !page && setCurrentPage(1)
    }, [searchParams]);

    useEffect(() => {
        // let maxPage = Math.ceil(count / import.meta.env.VITE_LIMIT);
        // let end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1);
        // let start = (currentPage - 1) <= 0 ? 1 : (currentPage -1);
        // let temp = [];
        // for (let i = start; i <= end; i++) temp.push(i);
        // setArrPage(temp);
        
        
        // currentPage >= (maxPage - 1) ? setIsHideEnd(true) : setIsHideEnd(false);
        // currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false); 

        let maxPage = Math.ceil(count / import.meta.env.VITE_LIMIT)
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
        let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2)
        let temp = []
        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)
        currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false)

    }, [count, posts, currentPage]);
    
    // const handlePageNumber = () => {
    //     let max = Math.floor(count / posts?.length);
    //     let arrNumber = [];

    //     for (let i = 1; i <= max; i++) {
    //         arrNumber.push(i)
    //     };

    //     return arrNumber
    // };

    return (
        <div className='flex items-center justify-center gap-2 py-5'>

            {!isHideStart && <PageNumber setCurrentPage={setCurrentPage} text={1} />}
            {(!isHideStart && currentPage !== 4) && <PageNumber text={"..."} />}
            {arrPage.length > 0 && arrPage.map(item => {
                return (
                    <PageNumber 
                        key={item}
                        text={item}
                        // currentPage={number || 1}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                )
            })}

            {!isHideEnd && <PageNumber text={"..."} />}
            {!isHideEnd && <PageNumber icon={">>"} setCurrentPage={setCurrentPage} text={Math.floor(count / posts.length)} type="end" />}
            
        </div>
    )
}

export default Pagination;