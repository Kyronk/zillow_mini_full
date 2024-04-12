import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Button, UpdatePost } from "../../components";
import Swal from 'sweetalert2';

import { apiDeletePost } from '../../services';

import moment from 'moment/min/moment-with-locales'; // fix tieng vn done
moment.locale("vi");

const ManagerPost = () => {

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { postsOfCurrent, dataEdit } = useSelector(state => state.post);

    const [updateData, setUpdateData] = useState(false);
    const [posts, setPosts] = useState([]);
    const [status, setStatus] = useState("0");
    useEffect(() => {
        !dataEdit && dispatch(actions.getPostsLimitAdmin())
    }, [dataEdit, updateData]);

    useEffect(() => {
        setPosts(postsOfCurrent);
    }, [postsOfCurrent]);

    // console.log(postsOfCurrent);
    // const checkStatus = (datatime) => {
    //     let todayInSeconds = new Date().getTime();
    //     let expireDayInSeconds = datatime.getTime();
    //     console.log({todayInSeconds, expireDayInSeconds})
    //     return todayInSeconds >= expireDayInSeconds ? "Đang hoạt động" : "Đã hết hạn"
    // } // bad
    // tại sao lại lỗi chỗ này
    // mặc định moment sẽ mặc địch tự nhận MM/DD/YYYY nên ta cần format lại dữ liệu đầu vào moment("day / mom/ year", "DD/MM/YYYY");

    // nếu làm tới ngày tháng, hiển thị, so sánh, lưu ngày tháng thì nên sài moment
    // const checkStatus = (dateString) => moment('8/10/2022').isBefore(new Date) ? "Đang hoạt động" : "Đã hết hạn"

    useEffect(() => {
        !dataEdit && setIsEdit(false);
    }, [dataEdit]);

    const checkStatus = (dateString) => {
        const today = new Date().toDateString();
        return moment(dateString, import.meta.env.VITE_FORMAT_DATE).isSameOrAfter(today);
    };

    const handleDelete = async (postId) => {
        // console.log(postId);
        const response = await apiDeletePost(postId);
        if (response?.data?.err === 0) {
            setUpdateData(prev => !prev);
        } else {
            Swal.fire("Oops!", "Xoá tun đăng thất bại", "error");
        }
    };

    // const handleFilterByStatus = (statusCode) => {
    //     setStatus(statusCode || "");
    //     if (statusCode === 1) {
    //         const activePost = postsOfCurrent?.filter(item => checkStatus(item?.overviews?.expired?.split(" ")[3]));
    //         setPosts(activePost);
    //     } else if (statusCode === 0) {
    //         const expiredPost = postsOfCurrent?.filter(item => !checkStatus(item?.overviews?.expired?.split(" "[3])));
    //         setPosts(expiredPost);
    //     } else if (!statusCode) {
    //         setPosts(postsOfCurrent);
    //     }
    // }

    useEffect(() => {
        console.log(status)
        if (status === 1) {
            const activePost = postsOfCurrent?.filter(item => checkStatus(item?.overviews?.expired?.split(" ")[3]));
            setPosts(activePost);
        } else if (status === 2) {
            const expiredPost = postsOfCurrent?.filter(item => !checkStatus(item?.overviews?.expired?.split(" "[3])));
            setPosts(expiredPost);
        } else {
            setPosts(postsOfCurrent);
        }
    }, [status]);


    return (
        <div className='flex flex-col gap-6'>
            <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
                <h1 className='text-3xl font-medium'>Quản lý tin đăng</h1>
                <select
                    name=""
                    id=""
                    onChange={e => setStatus(+e.target.value)}
                    // onChange={e => handleFilterByStatus(+e.target.value)} 
                    value={status}
                    className='outline-none border p-2 border-gray-200 rounded-md'
                >
                    <option value="0">Lọc theo trạng thái</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="2">Đã hết hạn</option>
                </select>
            </div>

            <table className='w-full table-auto'>
                <thead>
                    <tr className='flex w-full bg-gray-100'>
                        <th className='border flex-1 p-2'>Mã tin</th>
                        <th className='border flex-1 p-2'>Ảnh đại diện</th>
                        <th className='border flex-1 p-2'>Tiêu đề</th>
                        <th className='border flex-1 p-2'>Giá</th>
                        <th className='border flex-1 p-2'>Ngày băt đầu</th>
                        <th className='border flex-1 p-2'>Ngày hết hạn</th>
                        <th className='border flex-1 p-2'>Trạng thái</th>
                        <th className='border flex-1 p-2'>Tuỳ chọn</th>
                    </tr>
                </thead>

                <tbody>
                    {!posts ?
                        <tr>
                            <td>Hiện tại bạn chưa có tin đăng </td>
                        </tr>
                        : posts?.map((item, idx) => {
                            const timeI = item?.overviews?.expired?.split(" ")[3];
                            const time2 = "19/4/2024"
                            // console.log(typeof timeI);
                            // console.log(timeI)
                            return (
                                <tr className='flex items-center h-16' key={item.id}>
                                    <td className='border px-2 flex-1 h-full justify-center items-center'>{item?.overviews?.code}</td>
                                    <td className='border px-2 flex-1 h-full justify-center items-center'>
                                        <img src={JSON.parse(item?.images?.image)[0] || ""} alt="" className='w-10 h-10 object-cover rounded-md' />
                                    </td>
                                    <td className='border px-2 flex-1 h-full justify-center items-center'>{`${item?.title?.slice(0, 20)}...`}</td>
                                    <td className='border px-2 flex-1 h-full justify-center items-center'>{item?.attributes?.price}</td>
                                    <td className='border px-2 flex-1 h-full justify-center items-center'>{item?.overviews?.created}</td>
                                    <td className='border px-2 flex-1 h-full justify-center items-center'>{item?.overviews?.expired}</td>
                                    <td className='border px-2 flex-1 h-full justify-center items-center'>
                                        {/* {item?.overviews?.expired?.split(" ")[3] ? new Date(item?.overviews?.expired?.split(" ")[3])?.getTime() : ""} */}
                                        {/* {item?.overviews?.expired?.split(" ")[3]} */}
                                        {/* {new Date("2/3/2023").getTime()} */}
                                        {/* {new Date(time2).getTime()} */}

                                        {/* {new Date("12/5/2020").getTime()} */}
                                        {/* {checkStatus(new Date(item?.overviews?.expired?.split(' ')[3]))} */}
                                        {checkStatus(item?.overviews?.expired?.split(" ")[3]) ? "Đang hoạt động" : "Hết hạn"}
                                    </td>

                                    <td className='border px-2 flex-1 h-full flex items-center justify-center gap-4'>
                                        <Button
                                            text="Sửa"
                                            bgColor="bg-green-600"
                                            textColor="text-white"
                                            onClick={() => {
                                                // setDataEdit(item);
                                                dispatch(actions.editData(item))
                                                setIsEdit(true);
                                            }}
                                        />
                                        <Button
                                            text="Xoá"
                                            bgColor="bg-orange-600"
                                            textColor="text-white"
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {isEdit &&
                <UpdatePost
                    setIsEdit={setIsEdit}
                // dataEdit={dataEdit}
                />}
        </div>
    )
};

export default ManagerPost