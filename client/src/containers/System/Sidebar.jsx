import React from 'react'
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector, useDispatch } from "react-redux";
// import menuManage from '../../utils/menuManage';
import { Link, NavLink } from 'react-router-dom';
import * as action from "../../store/actions";

// icon
import { MdOutlineHouseSiding, MdOutlineLibraryBooks } from 'react-icons/md'
import { ImPencil2, ImBin } from 'react-icons/im'
import { BiUserPin } from 'react-icons/bi'
import { AiOutlinePlusCircle, AiOutlineLogout } from 'react-icons/ai'


const menuManage1 = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 4,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <BiUserPin />
    }
];

const activeStyle = "hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 font-bold bg-gray-200";
const notActiveStyle = "hover:bg-gray-200 flex rounded-md items-center gap-2  py-2 cursor-pointer";

// Link vs NavLink? NavLink có thể làm được cái active

const Sidebar = () => {

    const { currentData } = useSelector(state => state.user);
    const dispatch = useDispatch();
    // console.log(menuManage1);

    // const { currentData } = useSelector(state => state.user);


    return (
        <div
            className='w-[256px] flex-none p-4 flex flex-col gap-6'
        >
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <img src={anonAvatar} alt="avatar" className='w-12 h-12 object-cover rounded-full border-2 border-white' />
                    <div className='flex flex-col justify-center'>
                        <span className='font-semibold'>{currentData?.name}</span>
                        <small>{currentData?.phone}</small>
                    </div>
                </div>
                <span>Mã thành viên: <small className='font-medium'>{currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}</small></span>
            </div>

            <div>
                {menuManage1.map(item => {
                    return (
                        <NavLink
                            className={({isActive}) => isActive ? activeStyle : notActiveStyle }
                            key={item.id}
                            to={item?.path} >
                            {/*  */}
                            {/* <span>Icon</span> */}
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })
                }
                <span onClick={() => dispatch(action.logout())} className={notActiveStyle}>
                    <AiOutlineLogout />
                    Thoát</span>
            </div>
        </div>
    )
}

export default Sidebar