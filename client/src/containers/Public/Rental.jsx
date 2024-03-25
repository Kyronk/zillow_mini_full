import React, { useState, useEffect } from 'react'
import { text } from "../../utils/constant";
import { ItemSidebar,Province, RelatedPost } from '../../components';
import {  List, Pagination } from "./index";
// import { useSearchParams } from "react-router-dom";
import { 
    useSelector, 
    useDispatch 
} from "react-redux";
// import * as actions from "../../store/actions";
import { useLocation } from "react-router-dom";
import { formatVietnameseToString } from '../../utils/Common/formatVietnameseToString';
import * as actions from "../../store/actions";

// 1 page này sẽ gọi chung với 1 category giống như gọi theo loại sản phẩm tivi, tủ lạnh, laptop, ...

const Rental = () => {

    const { prices, areas, categories } = useSelector(state => state.app);
    const [ categoryCurrent, setCategoryCurrent] = useState({});
    // const dispatch = useDispatch();
    
    const [categoryCode, setCategoryCode]  = useState();
    const location = useLocation();
    useEffect(() => {
        const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname);
        setCategoryCurrent(category);

        if (category) {
            setCategoryCode(category.code);
        }
    }, [location]);

    console.log(categoryCurrent);




    return (
        <div className=' w-full flex flex-col gap-3'>
        {/* <Search /> */}
        <div>
            {/* <h1 className='text-[28px] font-bold' >{text.HOME_TITLE}</h1>
            <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p> */}
            <h1 className='text-[28px] font-bold' >{categoryCurrent?.header}</h1>
            <p className='text-base text-gray-700'>{categoryCurrent?.subheader}</p>
        </div>

        <Province />

        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <List 
                    categoryCode={categoryCode}
                    // page={params.get("page")}
                />
                <Pagination 
                    // page={params.get("page")}
                />

            </div>

            <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                {/* <ItemSidebar 
                    content={categories}
                    title={"Danh sách thuê"}
                /> */}
                <ItemSidebar 
                    type="priceCode"
                    isDouble={true}
                    content={prices}
                    title={"Xem theo giá"}
                />
                <ItemSidebar 
                    type="areaCode"
                    isDouble={true}
                    content={areas}
                    title={"Xem theo diện tích"}
                />

                <RelatedPost />

            </div>
        </div>
        


    </div>
    )
}

export default Rental