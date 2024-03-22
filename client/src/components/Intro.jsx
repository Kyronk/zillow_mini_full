import React, { memo } from 'react';
import { text } from '../utils/dataIntro';
import icons from "../utils/icons";
import {Button} from "../components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../utils/Common/formatVietnameseToString';

const { FaStar } = icons;
const star = [1,2,3,4,6];

const Intro = () => {

    const { categories } = useSelector(state => state.app);
    console.log(categories)

    return (
        <div className='border w-3/5 bg-white rounded-md shadow-md p-4 gap-4 flex-col flex justify-center items-center'>
            <h3 className='font-bold text-lg'>{text.title}</h3>
            <p className='text-gray-800 text-center my-4'>
                {`${text.description}`}
                <span className='text-link'>
                    {categories?.length > 0 && categories.map((item) => {
                        return (
                            <Link
                                to={`/${formatVietnameseToString(item.value)}`}
                                key={item.code}
                                className='text-blue-600 font-medium hover:text-orange-600'
                            >
                                {`${item.value.toLowerCase()}, `}
                            </Link>
                        )
                    }
                    )}
                    {`${text.description2}`}
                    
                </span>
            </p>
            <div className='flex items-center justify-around w-full'>
                {text.statistic.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className='flex flex-col justify-center items-center'
                        >
                            <h4 className='font-bld text-lg'>{item.value}</h4>
                            <p className='text-gray-700'>{item.name}</p>
                        </div>
                    )
                })}
            </div>

            <h3 className='font-bold text-lg py-2'>{text.price}</h3>
            <div className='flex item-center justify-center gap-1'>
                {star.map(item => {
                    return (
                        <span key={item}>
                            <FaStar color='yellow' size={24}/>
                        </span>
                    )
                })}
            </div>
            <p className='text-gray-600 italic text-center'>{text.comment}</p>
            <span className='text-gray-700'>{text.author}</span>
            <h3 className="font-bold text-lg py-2">{text.question}</h3>
            <p>{text.answer}</p>

            <Button 
                text="Đăng tin ngay"
                bgColor="bg-secondary2"
                textColor="text-white"
                px="px-6"
            />
            <div className='h-24'></div>
        </div>
    )
}

export default memo(Intro);