import React, {memo, useState} from 'react'
import icons from "../utils/icons";
import { useNavigate, Link } from "react-router-dom";
import { formatVietnameseToString } from '../utils/Common/formatVietnameseToString';
import { path } from '../utils/constant';

// const images = [
//     "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/6310726d-d075-4e35-b1cb-cf5616bf5212_1658240491.jpg",
//     "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/9c60836e-26b2-4737-a6c8-60cb5187fa4c_1658240485.jpg",
//     "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/716c753e-8e03-4cc8-9d09-e52ec19ce01b_1658240485.jpg",
//     "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/400e7ebd-5d88-48af-8599-0d074a1ee014_1658240494.jpg",
//     "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/1379ebdf-eda5-4ef8-bb22-7da1d19551f2_1658240490.jpg",
//     "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/6310726d-d075-4e35-b1cb-cf5616bf5212_1658240491.jpg",
//     "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/9c60836e-26b2-4737-a6c8-60cb5187fa4c_1658240485.jpg"
// ];

const { FaStar, FaHeart, FaRegHeart, BsBookmarkStarFill } = icons;

const indexs = [0,1,2,3];

const Item = ({
    images,
    user,
    title,
    star,
    description,
    attributes,
    address,
    id
}) => {
    
    const [ isHoverHeart, setIsHoverHeart ] = useState(false);
    // const navigate = useNavigate();
    // console.log(isHoverHeart);
    // console.log(images);

    const handleStar = (star) => {
        let stars = [];
        for ( let i = 1; i <= +star ; i++) stars.push(<FaStar className='star-item' size={18} color='yellow'/>)
        return stars;
    }


    // console.log(star)

    return (
        <div className='w-full flex border-t border-orange-600 py-4'>
            <Link
                // to={`chi-tiet/${formatVietnameseToString(title)}/${id}`}
                to={`${path.DETAIL}${formatVietnameseToString(title.replaceAll("/", ""))}/${id}`}
                className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'>
                {/* <div className='flex gap-1'> */}
                    {/* <img src={images[0]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    <img src={images[1]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    <img src={images[2]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    <img src={images[3]} alt="preview" className='w-[140px] h-[120px] object-cover' /> */}
                    {images?.length > 0 && images.filter((i, index) => indexs.some(i=> i === index))?.map((i, index) => {
                        return (
                            <img key={index} src={i} alt="preview" className='w-[47%] h-[120px] object-cover' />
                        )
                    })}

                    <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4' >{`${images?.length} ảnh`}</span>
                    <span 
                        className='text-white absolute right-5 bottom-1'
                        onMouseEnter={() => setIsHoverHeart(true)}
                        onMouseLeave={() => setIsHoverHeart(false)} 
                        >
                        {isHoverHeart ? <FaHeart size={24} color="red"/> : <FaRegHeart size={26} />}
                    </span>
                {/* </div> */}
            </Link>

            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <Link 
                        className='text-red-600 font-medium'
                        to={`${path.DETAIL}${formatVietnameseToString(title.replaceAll("/", ""))}/${id}`}
                        >
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}

                        {/* <FaStar className='star-item' size={18} color='yellow'/>
                        <FaStar className='star-item' size={18} color='yellow'/>
                        <FaStar className='star-item' size={18} color='yellow'/>
                        <FaStar className='star-item' size={18} color='yellow'/>
                        <FaStar className='star-item' size={18} color='yellow'/> */}

                        {/* CHO THUÊ CĂN HỘ HOẶC VĂN PHÒNG LÀM VIỆC */}
                        {title}
                    </Link>

                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={24} color="orange" />
                    </div>

                </div>

                <div className='my-2 flex items-center justify-between gap-2'>
                    <span className='font-bold flex-3 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
                    <span className='flex-1 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.acreage}</span>
                    <span className='flex-3'>
                        {`${address.split(',')[address.split(",").length - 2]} ${address.split(",")[address.split(",").length - 1]}`}
                    </span>
                </div>

                <p className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden'>
                    {/* CĂN HỘ CAO CẤP Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptatum error quam amet hic molestiae perspiciatis, earum magni voluptatibus nulla, id eum quia veniam incidunt eius illo nemo nesciunt sapiente? */}
                    {description}
                </p>

                <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center'>
                        <img src="https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png" alt="" className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>{user?.name}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <button
                            type='button'
                            className='bg-blue-700 text-white p-1 rounded-md'
                        >
                            {`Gọi ${user?.phone}`}
                        </button>

                        <button
                            type='button'
                            className='text-blue-700 px-1 rounded-md border border-blue-700'
                        >
                            Nhắn Zalo
                        </button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default memo(Item);