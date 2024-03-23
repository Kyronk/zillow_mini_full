import React, { useEffect } from 'react'
import { text } from "../../utils/constant";
import { ItemSidebar,Province, RelatedPost } from '../../components';
import {  List, Pagination } from "./index";
// import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";


const HomePage = () => {

    const dispatch = useDispatch();

    // console.log(params.get("page"));
    const { categories, prices, areas } = useSelector(state => state.app);
    // console.log(categories)
    useEffect(() => {
        dispatch(actions.getPrice());
        dispatch(actions.getArea());
    }, []);
    // console.log(prices);

    return (
        <div className=' w-full flex flex-col gap-3'>
            {/* <Search /> */}
            <div>
                <h1 className='text-[28px] font-bold' >{text.HOME_TITLE}</h1>
                <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>

            <Province />

            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List 
                        // page={params.get("page")}
                    />
                    <Pagination 
                        // page={params.get("page")}
                    />
    
                </div>

                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <ItemSidebar 
                        content={categories}
                        title={"Danh sách thuê"}
                    />
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

export default HomePage