import React, { useState } from 'react'
import { InputForm, Button } from '../../components'
import Swal from 'sweetalert2';

const Contact = () => {
    const [payload, setPayload] = useState({
        name: "",
        phone: "",
        content: ""
    });
    const handleSubmit = () => {
        // console.log(payload)
        Swal.fire("Thanks!", "Phản hồi của bạn dã được ghi nhận ", "success").then(() => {
            setPayload({
                name: "",
                phone: "",
                content: ""
            }
            )});
    };

    return ( 
        <div className='w-full'>
            <h1 className='text-2xl'>Liên hệ với chúng tôi</h1>
            <div className='flex gap-4'>
                <div className='flex-1 flex flex-col gap-4 h-fit bg-red-400 rounded-3xl p-4 text-white bg-gradient-to-br from-blue-700 to-cyan-400'>
                    <h4 className='font-medium'>Thông tin liên hệ</h4>
                    <span>Chúng tôi biết bạn có rất nhiều lựa chọn. Nhưng cảm ơn vì đã tin tưởng và lựa chọn chúng tôi</span>
                    <span>Điện thoại: 0917 877 888</span>
                    <span>Email: cskh.zl@gmail.com</span>
                    <span>Zalo: 0982 789 899</span>
                    <span>Viber: 0987 678 998</span>
                    <span>Địa chỉ: LE-4.08, Toà nhà Lexington Resigence. Số 98 Mai chí thọ, Phường An Phú, Quận 2, Tp. HCM</span>
                </div>

                <div className='flex-1 bg-white shadow-md rounded-md p-4 mb-6'>
                    <h4 className='font-medium'>Liên hệ trực tuyết</h4>
                    <div className='flex flex-col gap-4'>
                        <InputForm
                            label="Họ và tên của bạn"
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload="name"
                        />
                        <InputForm 
                            label="Số điện thoại"
                            value={payload.phone}
                            setValue={setPayload}
                            keyPayload="phone"
                        />

                        <div>
                            <label htmlFor="">Nội dung mô tả</label>
                            <textarea 
                                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full' 
                                name="content" 
                                id="desc" 
                                cols="30" 
                                rows="3"
                                value={payload.content}
                                // setValue={setPayload}
                                onChange={(e) => setPayload(prev =>({ ...prev, content: e.target.value}))}
                                ></textarea>
                        </div>

                        <Button
                            text="Gửi liên hệ"
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            fullWidth
                            onClick={handleSubmit}
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Contact