import React, { useState } from 'react'
import { InputReadOnly, InputFormV2, Button } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { apiUploadImage, apiUpdateUser } from '../../services';
import validate from '../../utils/Common/validateFields';
import { fileToBase64, blobToBase64 } from '../../utils/Common/tobase64';
import { getCurrent } from '../../store/actions';
import Swal from 'sweetalert2';
// import 

import anonAvatar from "../../assets/anon-avatar.png";


const EditAccount = () => {
    const { currentData } = useSelector(state => state.user); 
    const dispatch = useDispatch();

    const [invalidFields, setInvalidFields] = useState([]);
    const [ payload, setPayload] = useState({
        name: currentData?.name || "",
        avatar: blobToBase64(currentData?.avatar || "") || "",
        // avatar: currentData?.avatar || "",
        fbUrl: currentData?.fbUrl || "",
        zalo: currentData?.zalo || ""
    })
    // console.log(currentData.zalo);
    // console.log(payload)

    const handleSubmit = async () => {
        // const invalidcounter = validate(payload, setInvalidFields);
        // console.log(invalidcounter);
        // bỏ qua validate cũng được 
        const response = await apiUpdateUser(payload);
        // console.log(response)
        // console.log(payload);
        if ( response?.data.err === 0) {
            Swal.fire("Done", "Chỉnh sửa thông tin cá nhân thành công", "success").then(() => {
                dispatch(getCurrent());
            })
        } else {
            Swal.fire("Oops!", "Chỉnh sửa thông tin cá nhân không thành công", "error");
        }
    };

    const handleUploadFile = async (e) => {
        // cách này lưu trên cloud
        // const image = e.target.files[0];
        // const formData = new FormData();
        // formData.append("file", image);
        // formData.append("upload_preset", import.meta.env.VITE_UPLOAD_ASSETS_NAME);
        // const response = await apiUploadImage(formData);
        // console.log(response);
        // if (response.status === 200) {
        //     setPayload(prev => ({
        //         ...prev,
        //         avatar: response?.data?.secure_url,
        //     }))
        // };

        // cách này lưu trên DB
        const imageBase64 = await fileToBase64(e.target.files[0]);
        // console.log(imageBase64);
        setPayload(prev => ({
            ...prev,
            avatar: imageBase64,
        }))
    }

    return (
        <div className='flex flex-col h-full items-center'>
            <h1 className='text-3xl w-full text-start font-medium py-4 border-b border-gray-200'>Chỉnh sửa thông tin cá nhân</h1>
            <div className='w-3/5 flex items-center justify-center flex-auto'>
            <div className='py-6 flex flex-col gap-4 w-full'>
                <InputReadOnly 
                    // value={currentData?.id || ""}
                    value={`${currentData?.id?.match(/\d/g).join("")?.slice(0,6)}` || ""}
                    label="Mã thành viên"
                    direction="flex-row"
                    />
                <InputReadOnly 
                    value={currentData?.phone || ""}
                    // value={payload.phone}
                    label="Sốt điện thoại"
                    direction="flex-row"
                    isPhone
                    />
                <InputFormV2 
                    name="name"
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    direction="flex-row"
                    label="Tên hiển thị" 
                    setValue={setPayload}
                    // value={currentData?.name || ""}
                    value={payload.name}
                    />
                <InputFormV2
                    name="zalo"
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    direction="flex-row"
                    label="Zalo" 
                    setValue={setPayload}
                    // value={currentData?.zalo || ""}
                    value={payload.zalo}
                    />
                <InputFormV2
                    name="fbUrl"
                    setValue={setPayload}
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    direction="flex-row"
                    label="Facebook" 
                    value={payload.fbUrl}
                    />

                <div className='flex'>
                    <label className='w-48 flex-none' htmlFor="password">Mật khẩu</label>
                    <small className='flex-auto text-blue-500 h-12 cursor-pointer' >Đổi mật khẩu</small>
                </div>

                <div className='flex mb-10'>
                    <label className="w-48 flex-none" htmlFor="avatar">Ảnh đại diện</label>
                    <div>
                        <img src={payload.avatar|| anonAvatar} alt="" className='w-28 h-28 rounded-full object-cover' />
                        {/* validate disable */}
                        {/* {invalidFields?.some(item => item.name === 'avatar') &&
                            <small className='text-red-500 block w-full'>
                                {invalidFields?.find(item => item.name === 'avatar')?.message}
                            </small>
                        } */}
                        <input onChange={handleUploadFile} type="file" className='appearance-none my-4' id="avatar" />
                    </div>
                </div>

                <Button 
                    text="Cập nhập"
                    bgColor="bg-blue-600"
                    textColor="text-white"
                    fullWidth
                    onClick={handleSubmit}
                />

                <div className='h-20'></div>
            </div>
            </div>
        </div>
    )
}

//  video 78 phut 10

export default EditAccount