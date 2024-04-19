import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { SliderCustom, RelatedPost } from '../../components';

import { BoxInfo} from "../../components/"

// import { apiGetPostLimit } from '../../services/post';
import { getPostsLimit } from "../../store/actions";
import objToArr from '../../utils/Common/objToArr';
// import { useNavigate, createSearchParams } from 'react-router-dom';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';

// icon
import { FaLocationArrow } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiSolidArea } from "react-icons/bi";
import { IoMdTimer } from "react-icons/io";
import { FaHashtag } from "react-icons/fa6";

const DetailPost = () => {
    const { postId } = useParams();
    // console.log(postId);
    // const params = useParams();
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);
    const navigate = useNavigate();

    useEffect(() => {
        postId && dispatch(getPostsLimit({ limitPost: 1, id: postId }));

    }, [postId]);

    // const handleFilterLabel = () => {
    //     const titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labelData?.value}`;
    //     navigate({
    //         pathname: `/${path.SEARCH}`,
    //         search: createSearchParams(
    //             {labelCode: posts[0]?.labelDate?.code}
    //         ).toString()
    //     }, {state: {titleSearch}})  
    // }   

    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <SliderCustom
                    // images={posts && postId.length > 0 && JSON.parse(posts[0]?.images?.image) || ""}
                />
                <div className='bg-white rounded-md shadow-md p-4'>
                    <div className='flex flex-col gap-2' >
                        <h2 className='text-xl font-semibold text-red-600 my-2'>{posts[0]?.title || ""}</h2>
                        <div className='flex items-center gap-2'>
                            <span>Chuyên mục:</span>
                            <span 
                                className='text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer'
                                // onClick={handleFilterLabel}
                                >{posts[0]?.labelData?.value}</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <FaLocationArrow color="#2563eb" />
                            <span>{posts[0]?.address}</span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-1'>
                                <FaMoneyBillWave />
                                <span className='font-semibold text-lg text-green-600'>
                                    {posts[0]?.attributes?.price}
                                </span>
                            </span>

                            <span className='flex items-center gap-1'>
                                <BiSolidArea />
                                <span >{posts[0]?.attributes?.acreage}</span>
                            </span>

                            <span className='flex items-center gap-1'>
                                <IoMdTimer />
                                <span>{posts[0]?.attributes?.published}</span>
                            </span>

                            <span className='flex items-center gap-1'>
                                <FaHashtag />
                                <span>{posts[0]?.attributes?.hashtag}</span>
                            </span>

                        </div>

                    </div>

                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin mô tả</h3>
                        <div className='flex flex-col gap-3'>
                            {posts[0]?.description && JSON.parse(posts[0]?.description)?.map((item, index) => {
                                return (
                                    <span key={index}>{item}</span>
                                )
                            })}
                        </div>
                    </div>

                    <div className='mt-8'>
                        <h3 className='font-semibold'>Đặc điểm tin đăng</h3>
                        <table className='w-full'>
                            <tbody className='w-full'>
                                <tr className='w-full'>
                                    <td className='p-2'>Mã tin</td>
                                    <td className='p-2' >{posts[0]?.overviews?.code}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Khu vực</td>
                                    <td className='p-2'>{posts[0]?.overviews?.area}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Loại tin rao</td>
                                    <td className='p-2'>{posts[0]?.overviews?.type}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Đối tượng</td>
                                    <td className='p-2'>{posts[0]?.overviews?.target}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Gói tin</td>
                                    <td className='p-2'>{posts[0]?.overviews?.bonus}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Ngày đăng</td>
                                    <td className='p-2'>{posts[0]?.overviews?.created}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Ngày hết hạn</td>
                                    <td className='p-2'>{posts[0]?.overviews?.expired}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin liên hệ</h3>
                        <table className='w-full'>
                            <tbody className='w-full'>
                                <tr className='w-full'>
                                    <td className='p-2'>Liên hệ</td>
                                    <td className='p-2' >{posts[0]?.user?.name}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Điện thoại</td>
                                    <td className='p-2'>{posts[0]?.user?.phone}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Zalo</td>
                                    <td className='p-2'>{posts[0]?.user?.phone}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Bản đồ</h3>
                        {/* chỗ map này tốn tiền nên không làm :))) */}
                    </div>
                </div>

            </div>

            {/* DetailPost */}
            <div className='w-[30%] flex flex-col gap-8'>
                <BoxInfo 
                    userData={posts[0]?.user}
                />

                <RelatedPost />
                <RelatedPost newPost/>

            </div>
        </div>
    )
}

export default DetailPost