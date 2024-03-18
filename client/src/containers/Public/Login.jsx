import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useLocation, useNavigate } from "react-router-dom";
import { apiRegister } from '../../services/auth';
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Login = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoggedIn, msg, update } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [ isRegister, setIsRegister ] = useState(location.state?.flag);
    const [ invalidFields, setInvalidFields ] = useState([]);
    const [payload, setPayload] = useState({
        phone: "",
        password: "",
        name: ""
    });
    // console.log(location.state?.flag);

    // const [ isRegister, setIsRegister ] = useState(false);
    useEffect(() => {
        setIsRegister(location.state?.flag);
    }, [location.state?.flag]);

    useEffect(() => {
        isLoggedIn && navigate("/")
    }, [isLoggedIn]);

    useEffect(() => {
        msg && Swal.fire("Oops!", msg, "error");
    }, [msg, update]);

    const handleSubmit = async() => {
        // console.log(payload)
        // const response = await apiRegister(payload);
        // dispatch(actions.register(payload))
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload);
        if (invalids === 0 )  isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));  

        // console.log(invalids);
        // isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));      
    };
    
    // console.log(invalidFields);
    const validate = (payload) => {
        // let invalids = 0;
        // let fields = Object.entries(payload);
        // fields.forEach(item => {
        //     if(item[1] === "") {
        //         setInvalidFields(prev => [...prev, {
        //             name: item[0],
        //             message: "Bạn không được bỏ tróng trường này"
        //         }])
        //         invalids++
        //     }
        // })

        // fields.forEach(item => {
        //     switch (item[0]) {
        //         case "password":
        //             if (item[1].length < 6) {
        //                 setInvalidFields(prev => [...prev, {
        //                     name: item[0],
        //                     message: "Mật khẩu phải có tối thiểu 6 ký tự"
        //                 }])
        //                 invalids++
        //             }
        //             break;

        //     //  chỗ này code hơi vó vẫn
        //     // số điện thoại thì thường phải gắn mã vùng là dấu +
        //     // số đt ở vn thì phải có số 0 ở đầu tiên
        //     // ở đây ta ép kiểu string là +string = NaN
        //     // mà Nan !== number nên nó đúng (vler thật)
        //         case "phone":
        //             // mà Nan !== number nên nó đúng (vler thật)
        //             // if( typeof +item[1] !== "number") {
        //             //     setInvalidFields(prev => [...prev , {
        //             //         name: item[0],
        //             //         message: "Số điện thoại không hợp lệ"
        //             //     }])
        //             // }
        //             if(!+item[1] ) {
        //                 setInvalidFields(prev => [...prev , {
        //                     name: item[0],
        //                     message: "Số điện thoại không hợp lệ"
        //                 }])
        //             }
        //             invalids++

        //         default:
        //             break
        //     }

        //     return invalids;
        // }
        // )

        ///
        let invalids = 0;
        let fields = Object.entries(payload)
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: 'Bạn không được bỏ trống trường này.'
                }])
                invalids++
            }
        })
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
                        }])
                        invalids++
                    }
                    break;
                case 'phone':
                    if (!+item[1]) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không hợp lệ.'
                        }])
                        invalids++
                    }
                    break

                default:
                    break;
            }
        })
        return invalids
    }


    return (
        <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
            <h3 className='font-semibold text-2xl'>{isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}</h3>
            <div className='w-full flex flex-col gap-5'>
                { isRegister && <InputForm 
                    label={"Họ tên"}  
                    value={payload.name} 
                    setValue={setPayload} 
                    keyPayload={"name"}
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    
                    />}
                <InputForm 
                    label={"SỐ ĐIỆN THOẠI"}
                    value={payload.phone}
                    setValue={setPayload}
                    keyPayload={"phone"}
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    />
                <InputForm 
                    label={"MẬT KHẨU"}
                    value={payload.password} 
                    setValue={setPayload}
                    keyPayload={"password"}
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    type="password"

                />

                <Button
                    text={isRegister ? "TẠO TÀI KHOẢNG" : "ĐĂNG NHẬP"}
                    bgColor="bg-secondary1"
                    textColor="text-white"
                    fullWidth
                    onClick={handleSubmit}
                    
                    />
            </div>

            <div className='mt-7 flex items-center justify-between'>
                {/* <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu </small>
                <small className='text-[blue] hover:text-[red] cursor-pointer'>Tạo tài khoảng mới </small> */}
                {isRegister 
                    ? <small> Bạn đã có tài khoản ? <span
                        onClick={() => {
                            setIsRegister(false)
                            setPayload({
                                phone: "",
                                password: "",
                                name: ""
                            })
                        }}
                        className='text-blue-500 hover:underline cursor-pointer'
                    >

                            Đăng nhập ngay !
                    </span>
                    </small>
                    : 
                    <>
                        <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu</small>
                        <small
                            onClick={() => {
                                setIsRegister(true);
                                setPayload({
                                    phone: "",
                                    password: "",
                                    name: ""
                                })
                                }
                            }
                            className='text-[blue] hover:text-[red] cursor-pointer'
                        >
                            Tạo tài khoản mới
                        </small>
                    </>
                }

            </div>
        </div>
    )
}

export default Login