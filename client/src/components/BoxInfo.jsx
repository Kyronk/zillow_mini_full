import React, { memo } from 'react'
import anonAvatar from "../assets/anon-avatar.png"
import { Button } from "./";

import { GoDotFill } from "react-icons/go";
import { FaPhone } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";


const BoxInfo = ({
    // userData: {name ="", phone ="", zalo =""}
    userData
}) => {
    return (
        <div className='w-full bg-yellow-600 rounded-md flex flex-col items-center p-4 gap-4'>
            <img src={anonAvatar} alt="avatar" className='w-16 h-16 object-contain rounded-full' />
            <h3 className='font-medium text-xl'>{userData?.name}</h3>
            <span className='flex items-center'>
                <GoDotFill color="green"/>
                <span>Đang hoạt động</span>
            </span>
            <a  
                className='bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg' 
                href="">
                    <FaPhone/>{userData?.phone}
            </a>

            <a  
                className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md  font-bold text-lg' 
                // href={`https://zalo.me/${userData?.zalo}`} // bắm được 
                >
                    <SiZalo color="blue" size={35}  />{userData?.phone}
            </a>
            {/* <Button 
                text={phone}
                bgColor="bg-[#13BB7B]"
                fullWidth
                textColor="text-white font-bold text-lg"
                IcBefore={FaPhone}
            /> */}
        </div>
    )
}

export default memo(BoxInfo) 