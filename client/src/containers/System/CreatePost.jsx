import React, { useState } from 'react'
import { Overview, Address } from '../../components'
import { BsCameraFill, BsCloudFogFill } from "react-icons/bs";
import { apiUploadImage } from '../../services';

const CreatePost = () => {

    const [payload, setPayload] = useState({
        categoryCode: '',
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        images: '',
        address: '',
        priceCode: '',
        areaCode: '',
        description: '',
        target: '',
        province: ''
    });

    const [ imagesPreview, setImagesPreview ] = useState([]);
    // const [ imagesPreview, setImagesPreview ] = useState(['https://res.cloudinary.com/dwjsk2qlw/image/upload/v1712334994/dmunoessiztdhfxwdbsb.jpg', 'https://res.cloudinary.com/dwjsk2qlw/image/upload/v1712334995/b6jenouw0vmgq3g5sdq2.png']);


    console.log(payload);

    const handleFiles = async (e) => {
        e.stopPropagation();
        let images = [];
        let files = e.target.files;
        let formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append("upload_preset", import.meta.env.VITE_UPLOAD_ASSETS_NAME);
            let response = await apiUploadImage(formData);
            // console.log(response);
            if ( response.status === 200) images = [...images, response?.data?.secure_url]
        }
        setImagesPreview(images);
        setPayload(prev => ({...prev, images: JSON.stringify(images)}))
        console.log(images);
    }

    return (
        <div className='px-6'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Đăng tin mới</h1>
            <div className='flex gap-4'>
                <div className="py-4 flex flex-col gap-8 flex-auto">
                    <Address payload={payload} setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
                    <div className='w-full'>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <small>Cập nhập hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                        <div className='w-full'>
                            <label htmlFor="file" className='w-full border-2 h-[200px] my-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md'>
                                <BsCameraFill size={50} color={"blue"} />
                                Thêm ảnh
                            </label>
                            <input onChange={handleFiles} hidden type="file" id="file" multiple />
                            
                            <div>
                                <h3 className='font-medium'>Preview</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview?.map((item, index) => (
                                        <img key={index} src={item} alt="preview" className='w-1/3 h-1/3 object-cover rounded-md' />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='h-[500px]'></div>

                </div>

                <div className='w-[30%] flex-none'>
                    maps
                </div>
            </div>
        </div>
    )
}

export default CreatePost