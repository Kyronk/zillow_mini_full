import React, { useState, useEffect } from 'react'
import { ItemSidebar, RelatedPost } from '../../components';
import {  List, Pagination } from "./index";
// import { useSearchParams } from "react-router-dom";
import { 
    useSelector, 
    useDispatch 
} from "react-redux";
import { useLocation } from "react-router-dom";
// import * as actions from "../../store/actions";
// import { useLocation } from "react-router-dom";
// import { formatVietnameseToString } from '../../utils/Common/formatVietnameseToString';
// import * as actions from "../../store/actions";

// 1 page này sẽ gọi chung với 1 category giống như gọi theo loại sản phẩm tivi, tủ lạnh, laptop, ...

const SearchDetail = () => {

    const { prices, areas, categories } = useSelector(state => state.app);
    const location = useLocation();
    console.log(location)
    // const [ categoryCurrent, setCategoryCurrent] = useState({});
    // const dispatch = useDispatch();
    
    // const [categoryCode, setCategoryCode]  = useState();
    // const location = useLocation();
    // useEffect(() => {
    //     const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname);
    //     setCategoryCurrent(category);

    //     if (category) {
    //         setCategoryCode(category.code);
    //     }
    // }, [location]);

    // console.log(categoryCurrent);




    return (
        <div className=' w-full flex flex-col gap-3'>
        
            <div>
                <h1 className='text-[28px] font-bold' >{location.state?.titleSearch || 'Kết quả tìm kiếm'}</h1>
                <p className='text-base text-gray-700'>{`${location.state?.titleSearch || ''} phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>

            </div>

        {/* <Province /> */}

        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <List 
                    // categoryCode={categoryCode}
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

export default SearchDetail

