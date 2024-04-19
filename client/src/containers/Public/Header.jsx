import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from "../../assets/logowithoutbg.png";
import { Button, User } from '../../components';
import icons from '../../utils/icons';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../utils/constant";
import { useSelector, useDispatch } from "react-redux"
import * as actions from "../../store/actions"
import menuManage from '../../utils/menuManage';

import { ImPencil2 } from "react-icons/im";
import { MdOutlineHouseSiding, MdOutlineLibraryBooks } from 'react-icons/md'
import { BiUserPin } from 'react-icons/bi'
import { AiOutlinePlusCircle, AiOutlineLogout } from 'react-icons/ai'


const { CiCirclePlus, FaChevronDown } = icons;

// fix tạm chỗ này mai mốt xem lại
const menuManage1 = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon:  <ImPencil2 />
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
    },

    {
        id: 5,
        text: 'Liên hệ',
        // path: '/he-thong/lien-he',
        path: '/lien-he',
        icon: <BiUserPin />
    }
]

const Header = () => {
    // console.log(menuManage);
    const { currentData } = useSelector(state => state.user);

    const [ searchParams] = useSearchParams();
    const headerRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);

    const [ isShowMenu, setIsShowMenu ] = useState(false);

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: {flag}})
    }, [])

    useEffect(() => {
        headerRef.current.scrollIntoView({behavior: "smooth", block: "start" });
        
    }, [searchParams.get("page")]);


    return (
        <div ref={headerRef} className='w-3/5'>
            <div className='max-w-1100 flex items-center justify-between'>
                <Link to={"/"}>
                    <img 
                        src={logo}
                        alt="logo"
                        className='w-[240px] h-[70px] object-contain'
                        />
                </Link>
                <div className='flex items-center gap-1'>
                    {!isLoggedIn && <div className='flex items-center gap-1'>
                        <span>Phòng trọ 123 xin chào!</span>
                            <Button 
                                text={"Đăng nhập"} 
                                textColor="text-white" 
                                bgColor="bg-[#3961fb]" 
                                onClick={() => goLogin(false)}
                                />
                            <Button 
                                text={"Đăng ký"} 
                                textColor="text-white" 
                                bgColor="bg-[#3961fb]" 
                                onClick={() => goLogin(true)}
                                />
                        </div>}
                    
                        {isLoggedIn && <div className='flex items-center gap-3 relative'>
                        {/* <span>{currentData.name}</span> */}
                            <User />
                            <Button 
                                text={"Quảng lý tài khoản"} 
                                textColor="text-white" 
                                bgColor="bg-blue-600" 
                                px="px-4"
                                // IcAfter={<FaChevronDown />}
                                IcAfter={FaChevronDown}

                                onClick={() => setIsShowMenu(prev => !prev)}
                                />

                            {
                                isShowMenu &&  <div className='absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col gap-2'>
                                {menuManage1.map(item => {
                                    return (
                                        
                                        <Link
                                            className='hover:text-orange-500 flex items-center gap-1 text-blue-600 border-b border-gray-200 py-2' 
                                            key={item.id} 
                                            to={item?.path} >
                                            {/*  */}
                                            {/* <span>Icon</span> */}
                                            {item?.icon}
                                            {item.text}
                                        </Link>
                                    
                                    )
                                    
                                })
                                
                                }
                                <span
                                        className='cursor-pointer flex items-center gap-2 hover:text-orange-500 text-blue-500 py-2'
                                        onClick={() => {
                                            setIsShowMenu(false)
                                            dispatch(actions.logout()) 
                                        }}
                                    >
                                        <AiOutlineLogout />
                                        Đăng xuất</span>
                            </div>}
                        </div>
                            }
                        
                        
                    <Button 
                        text={"Đăng tin mới"} 
                        textColor="text-white" 
                        bgColor="bg-secondary2"  
                        IcAfter={CiCirclePlus }
                        onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
                        
                        />


                </div>

            </div>

        </div>
    )
}

export default Header