import icons from "./icons";

import { MdOutlineHouseSiding, MdOutlineLibraryBooks } from 'react-icons/md'
import { ImPencil2, ImBin } from 'react-icons/im'
import { BiUserPin } from 'react-icons/bi'



const menuManage = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 4,
        text: 'Thông tin tài khoản',
        path: '/he-thong/thong-tin-tai-khoan',
        icon: <BiUserPin />
    }
]


export default menuManage;
