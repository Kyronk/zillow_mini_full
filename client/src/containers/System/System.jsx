import React from 'react'

import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';
import { path } from '../../utils/constant';
import { Header, Sidebar } from './';

const System = () => {
    const { isLoggedIn } = useSelector(state => state.auth);

    //  replace mặc định là false
    // nếu ta vào 1 route private rồi vào 1 route public thì lịch sử sẽ bị lưu lại
    // ta cần giá trị replace true để bảo vệ luôn cả route trong lịch sử (không dược truy cập nếu không có quyền)
    if ( !isLoggedIn ) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='w-full h-screen flex gap-1 flex-col items-center '>

            <Header />

            <div className='flex w-full flex-auto'>
                <Sidebar />
                <div className='flex-auto bg-white shadow-md h-full p-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default System