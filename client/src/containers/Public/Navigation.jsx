import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { apiGetCategory } from '../../services/category';
import { formatVietnameseToString } from '../../utils/Common/formatVietnameseToString';

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

// const nav = [
//     {name: "Trang chủ", path: "home"},
//     {name: "Cho thuê phòng trọ", path: "cho-thue-phong-tro"},
//     {name: "Nhà cho thuê", path: "nha-cho-thue"},
//     {name: "Cho thuê căn hộ", path: "cho-thue-can-ho"},
//     {name: "Cho thuê mặt bằng", path: "cho-thue-mat-bang"},
// ];

const notActive = "hover:bg-secondary2 h-full px-4 flex items-center bg-secondary1";
const active = "hover:bg-secondary2 h-full px-4 flex items-center bg-secondary2";


const Navigation = ({isAdmin}) => {
    
    const { categories } = useSelector(state => state.app);
    // const [categories, setCategories ] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchCategories = async () => {
        //     const response = await apiGetCategory();
        //     if( response?.data.err === 0) {
        //         setCategories(response.data.response);
        //     }
        // }
        // fetchCategories();
        dispatch(actions.getCategories())
    }, []);



    return (
        <div className={`w-full flex ${isAdmin ? "justify-start" : "justify-center"} items-center h-[40px] bg-secondary1 text-white''w-full  text-white`}>
            <div className='w-3/5 flex h-full items-center text-sm font-medium'>
                {/* {nav?.length > 0 && nav.map((item, index) => {
                    return (
                        <div key={index} className='h-full flex justify-center items-center'>
                            <NavLink
                                to={item.path}
                                className={({isActive}) => isActive ? active : notActive}
                            >
                                {item.name}
                            </NavLink>
                        </div>
                    )
                }) } */}

                <NavLink
                    to={"/"}
                    className={({isActive}) => isActive ? active : notActive }
                >
                    Trang chủ
                </NavLink>

                {categories?.length > 0 && categories.map(item => {
                    return (
                        <div
                            key={item.code}
                            className='h-full flex justify-center items-center'
                        >
                            <NavLink
                                className={({isActive}) => isActive ? active : notActive }
                                to={`/${formatVietnameseToString(item.value)}`}
                            >
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })

                }

            </div>
        </div>
    )
}

export default Navigation