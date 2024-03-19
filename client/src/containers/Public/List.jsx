import React, { useEffect } from 'react'
import { Button, Item } from "../../components";
import { getPosts, getPostsLimit } from '../../store/actions/post';
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "./index";


const List = () => {

    const dispatch = useDispatch();
    const { posts, count } = useSelector(state => state.post);
    useEffect(() => {
        dispatch(getPostsLimit(0))
    }, []);
    // console.log(posts);
    // console.log(count);

    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
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