import React, { useEffect, useState } from 'react';
import { Sitem } from "./index";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const RelatedPost = ({ newPost }) => {
    const dispatch = useDispatch();
    const { newPosts, outStandingPost } = useSelector(state => state.post);
    // const [ posts, setPosts ] = useState(newPost ? newPosts : outStandingPost );
    const [ posts, setPosts ] = useState([]);
    // console.log(newPosts)

    useEffect(() => {
        // dispatch(actins.getNewPosts());
        newPost ? dispatch(actions.getNewPosts()) : dispatch(actions.getOutStandingPost());
        // newPost ? setPosts(newPost) : setPosts(outStandingPost); 
    }, []);
    // console.log(newPosts);
    useEffect(() => {
        newPost ? setPosts(newPosts) : setPosts(outStandingPost); 
    }, [outStandingPost, newPosts]);
    return (
        <div className='w-full bg-white rounded-md p-4'>
            {/* <h3 className='font-semibold text-lg'>Tin mới đăng</h3> */}
            <h3 className='font-semibold text-lg'>{newPost ? "Tin nới đăng" : "Tin nổi bật"}</h3>
            <div className='w-full flex flex-col gap-2'>
                {posts?.map((item, index )=> {
                    return (
                        <Sitem 
                            key={index}
                            // key={item.id}
                            title={item.title}
                            price={item?.attributes?.price}
                            createdAt={item.createdAt}
                            image={JSON.parse(item?.images.image)}
                            star={item?.star}
                        />
                    )
                })}
                {/* <Sitem 
                    title='Căn hộ mới xây chưa qua sử dụng, ngay Hoàng Hoa Thám, Bình Thạnh bạn hãy người đầu tiên sở hữu, (phòng như hình 1000%)'
                    price="7.5 triệu/tháng"
                    createdAt="2 tháng trước"
                />
                <Sitem />
                <Sitem /> */}

            </div>
        </div>
    )
}

export default RelatedPost