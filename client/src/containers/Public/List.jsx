import React, { useEffect, useRef } from 'react'
import { Button, Item } from "../../components";
import { getPosts, getPostsLimit } from '../../store/actions/post';
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "./index";
import { useSearchParams } from 'react-router-dom';


const List = ({categoryCode}) => {
    const [ searchParams ] = useSearchParams(); 
    const listRef = useRef();
    const dispatch = useDispatch();
    // console.log(page)
    const { posts, count } = useSelector(state => state.post);
    // useEffect(() => {
    //     let page = searchParams.get("page");
    //     let offset = page ? +page - 1 : 0;
    //     dispatch(getPostsLimit({offset}));
    // }, [page]);
    // useEffect(() => {
    //     let params = []
    //     for (let entry of searchParams.entries()) {
    //         params.push(entry);
    //     }
    //     let searchParamsObject = {}
    //     params?.forEach(i => {
    //         if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
    //             searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
    //         } else {
    //             searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
    //         }
    //     })
    //     if (categoryCode) searchParamsObject.categoryCode = categoryCode
    //     dispatch(getPostsLimit(searchParamsObject))
    // }, [searchParams, categoryCode])
    useEffect(() => {
        let params = [];
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {};
        params?.map(i => { searchParamsObject = { ...searchParamsObject, [i[0]]: i[1]}});
        if(categoryCode) searchParamsObject.categoryCode = categoryCode;
        // console.log(searchParamsObject);
        dispatch(getPostsLimit(searchParamsObject));
    }, [searchParams, categoryCode])
    // console.log(categoryCode)


    return (
        <div ref={listRef} className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between my-3'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhập: 12:09 25/08/2022</span>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp: </span>
                <Button bgColor="bg-gray-200" text="Mặc định" />
                <Button bgColor="bg-gray-200" text="Mới nhất" />

            </div>

            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    return (
                        <Item 
                            key={item?.id}
                            address={item?.address}
                            attributes={item?.attributes}
                            // images={item?.images}
                            images={JSON.parse(item?.images?.image)}
                            star={+item?.star}
                            title={item?.title}
                            user={item?.user}
                            description={JSON.parse(item?.description)}
                            id={item?.id}
                        />
                    )
                })}

                {/* <Item /> */}
                {/* <Item />
                <Item />
                <Item />
                <Item /> */}
            </div>

            {/* <Pagination 
                length={posts?.length}
            /> */}

        </div>
    )
}

export default List