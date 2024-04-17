import React, { memo } from 'react';
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
};

const SliderCustom = ({images = "" , }) => {

    console.log(images)

    return (
        <div className='w-full'>
            <Slider {...settings}>
                <div className='bg-black flex justify-center h-[320px]'>
                    <img 
                        src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2019/11/11/untitled-1_1573444898.jpg" 
                        alt="slider"
                        className='h-full m-auto object-contain'
                        />
                </div>

                <span>
                    slider
                </span>

                <span>
                    slider
                </span>
            </Slider>
        </div>
    )
}

export default memo(SliderCustom);