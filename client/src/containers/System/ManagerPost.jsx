import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

import moment from 'moment/min/moment-with-locales'; // fix tieng vn done
moment.locale("vi");

const ManagerPost = () => {

    const dispatch = useDispatch();
    const { postsOfCurrent } = useSelector(state => state.post);
    useEffect(() => {
        dispatch(actions.getPostsLimitAdmin())
    }, [])

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
    const checkStatus = (dateString) => {
        const today = new Date().toDateString();
        return moment(dateString, import.meta.env.VITE_FORMAT_DATE).isSameOrAfter(today);
    }


    return (
        <div className='flex flex-col gap-6'>
            <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
                <h1 className='text-3xl font-medium'>Quản lý tin đăng</h1>
                <select name="" id="" className='outline-none border p-2 border-gray-200 rounded-md'>
                    <option value="">Lọc theo trạng thái</option>
                </select>
            </div>

            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='border p-2'>Mã tin</th>
                        <th className='border p-2'>Ảnh đại diện</th>
                        <th className='border p-2'>Tiêu đề</th>
                        <th className='border p-2'>Giá</th>
                        <th className='border p-2'>Ngày băt đầu</th>
                        <th className='border p-2'>Ngày hết hạn</th>
                        <th className='border p-2'>Trạng thái</th> 
                    </tr>
                </thead>

                <tbody>
                    {!postsOfCurrent ? 
                        <tr>
                            <td>Hiện tại bạn chưa có tin đăng </td>
                        </tr>
                        : postsOfCurrent?.map((item, idx) => {
                            const timeI = item?.overviews?.expired?.split(" ")[3]; 
                            const time2 = "19/4/2024"
                            // console.log(typeof timeI);
                            console.log(timeI)
                            return (
                                <tr key={item.id}>
                                    <td className='border text-center p-2'>{item?.overviews?.code}</td>
                                    <td className='border flex items-center justify-center p-2'>
                                        <img src={JSON.parse(item?.images?.image)[0] || ""} alt="" className='w-10 h-10 object-cover rounded-md' />
                                    </td>
                                    <td className='border text-center p-2'>{item?.title}</td>
                                    <td className='border text-center p-2'>{item?.attributes?.price}</td>
                                    <td className='border text-center p-2'>{item?.overviews?.created}</td>
                                    <td className='border text-center p-2'>{item?.overviews?.expired}</td>
                                    <td className='border text-center p-2'>
                                        {/* {item?.overviews?.expired?.split(" ")[3] ? new Date(item?.overviews?.expired?.split(" ")[3])?.getTime() : ""} */}
                                        {/* {item?.overviews?.expired?.split(" ")[3]} */}
                                        {/* {new Date("2/3/2023").getTime()} */}
                                        {/* {new Date(time2).getTime()} */}

                                        {/* {new Date("12/5/2020").getTime()} */}
                                        {/* {checkStatus(new Date(item?.overviews?.expired?.split(' ')[3]))} */}
                                        {checkStatus(item?.overviews?.expired?.split(" ")[3]) ? "Đang hoạt động" : "Hết hạn"}
                                    </td>

                                </tr>
                            )
                        })
                        }
                </tbody>
            </table>
        </div>
    )
};

export default ManagerPost