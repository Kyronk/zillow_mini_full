import React, {memo} from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

const notActive = "w-[48px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md cursor-pointer";
const active = "w-[48px] h-[48px] flex justify-center items-center bg-[#E13427] text-white hover:bg-gray-300 rounded-md cursor-pointer";


const PageNumber = ({ text, currentPage, icon, setCurrentPage, type }) => {

    const navigate = useNavigate();
    // console.log(currentPage)
    const [ paramsSearch ] = useSearchParams();
    let entries = paramsSearch.entries();

    const append = (entries) => {
        // let params = [];
        // paramsSearch.append("page", +text);
        // for (let entry of entries) {
        //     params.push(entry)
        // }
        // let searchParamsObject = {}
        // params?.map(i => {
        //     searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] }
        // });
        let params = []
        paramsSeach.append('page', +text)
        for (let entry of entries) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        return searchParamsObject

        // return searchParamsObject;
    }
    // append(entries)

    const handleChangePage = () => {
        if (! (text === "...")) {
            setCurrentPage(+text);
            // console.log(append(entries))
            navigate({
                pathname: "/",
                search: createSearchParams(
                    append(entries)
                ).toString()
                // search: createSearchParams({
                //     page: text
                // }).toString()
            })  
        }
    }


    return (
        <div 
            className={+text === +currentPage ? active : notActive}
            onClick={handleChangePage}
            >
            {icon || text}
        </div>
    )
}

export default memo(PageNumber);