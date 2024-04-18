import React from 'react'
// import moment from "moment";
// import moment from 'moment/dist/moment';

import icons from "../utils/icons";
const { FaStar } = icons;


import moment from 'moment/min/moment-with-locales'; // fix tieng vn done

//  moment là để format ra tiếng viẹt nam
// mặc định nó sẽ là tiếng anh ?? không format được ??
// không về tiếng việt được
// import 'moment/locale/vi';
moment.locale("vi");

const Sitem = ({
    title = "title",
    price,
    image,
    createdAt,
    star
}) => {

    const formatTime = (createAt) => {
        return moment(createAt).fromNow();
    }

    const handleStar = (star) => {
        let stars = [];
        for ( let i = 1; i <= +star ; i++) stars.push(<FaStar className='star-item' size={18} color='yellow'/>)
        return stars;
    }
    

    return (
        <div className='w-full flex items-center gap-2 py-2 border-b border-gray-300'>
            <img 
                // src="https://feliz-home.com.vn/wp-content/uploads/2023/02/uecuhb.jpg" 
                src={image[0]}
                alt="and"
                className="w-[65px] h-[65px] object-cover round-md flex-none"
                />

            <div className='flex flex-col justify-between w-full gap-1 flex-auto'>
                <h4 className='text-blue-600 text-[14px]'>
                    {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                    {`${title.slice(0, 40)}...`}.</h4>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-sm font-medium text-green-500'>{price}</span>
                    {/* <span className='text-sm text-gray-300'>{moment(createdAt).fromNow()}</span> */}
                    <span className='text-sm text-gray-300'>{formatTime(createdAt)}</span>

                </div>
            </div>
        </div>
    )
}

export default Sitem