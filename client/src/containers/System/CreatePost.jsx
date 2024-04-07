import React, { useState } from 'react'
import { Overview, Address, Loading, Button } from '../../components'
import { apiUploadImage } from '../../services';
import { useSelector } from 'react-redux'
import { getCodes, getCodesArea} from "../../utils/Common/getCode";

import { BsCameraFill, BsCloudFogFill } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";


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
    // const [ imagesPreview, setImagesPreview ] = useState(['https://res.cloudinary.com/dwjsk2qlw/image/upload/v1712377576/zillow_mini/epo702jkfpszgum8qusn.jpg', 'https://res.cloudinary.com/dwjsk2qlw/image/upload/v1712379590/zillow_mini/kzcqzfcrif42d9trnmtc.jpg']);

    const [ isLoading, setIsLoading ] = useState(false);
    const { prices, areas } = useSelector(state => state.app);
    console.log(areas)
    // console.log({prices, areas});

    // console.log(payload);

    const handleFiles = async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        let images = [];
        let files = e.target.files;
        let formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append("upload_preset", import.meta.env.VITE_UPLOAD_ASSETS_NAME);
            let response = await apiUploadImage(formData);
            // console.log(response);
            if ( response.status === 200) images = [...images, response?.data?.secure_url]
        };
        setIsLoading(false);
        // setImagesPreview(images);
        setImagesPreview(prev => [...prev, ...images]);
        // setPayload(prev => ({...prev, images: JSON.stringify(images)}))
        setPayload(prev => ({...prev, images: [ ...prev.images, ...images] }));

        // console.log(images);
    };

    const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image));
        // setPayload(prev => [ ...prev, prev.images?.filter(item => item !== image)] );
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    };

    const handleSubmit = () => {
        let priceCodeArr = getCodes( +payload.priceNumber, prices, 1, 15);
        let priceCode = priceCodeArr[0]?.code;
        let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90);
        // khuc này có vấn đề là phải nhập vào con số cao từ 10 20m2 trở lên 
        // console.log(areaCodeArr);
        let areaCode = areaCodeArr[0]?.code;
        // console.log({priceCode, areaCode});
        let finalPayload = {
            ...payload,
            priceCode,
            areaCode,
        };
        console.log(finalPayload);

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
                                {isLoading ?
                                    <Loading /> :
                                    <div className='flex flex-col items-center justify-center'>
                                        <BsCameraFill size={50} color={"blue"} />
                                        Thêm ảnh
                                    </div>
                                }

                            </label>
                            <input onChange={handleFiles} hidden type="file" id="file" multiple />
                            
                            <div>
                                <h3 className='font-medium'>Preview</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview?.map((item, index) => (
                                        <div key={index} className='relative w-1/3 h-1/3 '>
                                            <img  src={item} alt="preview" className='object-cover rounded-md' />
                                            <span 
                                                title="Xoá" 
                                                className='absolute top-0 right-0 cursor-pointer bg-gray-100 hover:bg-gray-300 rounded-full'
                                                onClick={() => handleDeleteImage(item)}
                                                > <TiDeleteOutline  size={30} /> </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleSubmit} text='Tạo mới' bgColor='bg-green-600' textColor='text-white' />

                    <div className='h-[500px]'></div>

                </div>

                <div className='w-[30%] flex-none'>
                    maps
                    {/* <Loading /> */}
                </div>
            </div>
        </div>
    )
}

export default CreatePost