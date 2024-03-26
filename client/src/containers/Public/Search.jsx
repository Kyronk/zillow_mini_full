import React, { useState }  from 'react'
import { SearchItem, Modal } from '../../components'
import icons from "../../utils/icons";
import { useSelector } from "react-redux";

const {
    GrNext, 
    IoLocation,
    TbReportMoney,
    RiCrop2Line,
    FaBuilding,
    IoIosSearch,
} =  icons;

const Search = ({

}) => {

    const { provinces, areas, prices, categories } = useSelector(state =>  state.app);
    const [ isShowModal, setIsShowModal ] = useState(false);
    const [ name, setName ] = useState("");
    const [ content, setContent ] = useState([]);
    

    const handleShowModal = ( content, name, defaultText ) => {
        setContent(content);
        setName(name);
        setIsShowModal(true);
    }

    return (
        <>
            <div className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span onClick={() => handleShowModal(categories,"category" ,"Phòng trọ, nhà trọ")} className='cursor-pointer flex-1'>
                    <SearchItem 
                        text={"Phòng trọ, nhà trọ"}
                        iconAfter={<GrNext />}
                        fontWeight
                        iconBefore={<FaBuilding />}
                    />
                </span>

                <span onClick={() => handleShowModal(provinces, "province", "Toàn quốc")} className='cursor-pointer flex-1'>
                    <SearchItem 
                        text={"Toàn quốc"}
                        iconAfter={<GrNext />}
                        iconBefore={<IoLocation />}
                    />
                </span>

                <span onClick={() => handleShowModal(prices, "price", "Chọn giá")} className='cursor-pointer flex-1'>
                    <SearchItem 
                        text={"Chọn giá"}
                        iconAfter={<GrNext />}
                        iconBefore={<TbReportMoney />}
                    />
                </span>

                <span onClick={() => handleShowModal(areas, "area", "Chọn diện tích")} className='cursor-pointer flex-1'>
                    <SearchItem 
                        text={"Chọn diện tích"}
                        iconAfter={<GrNext />}
                        iconBefore={<RiCrop2Line />}
                    />
                </span>

                <button
                    type="button"
                    className='outline-none py-2 px-4 w-full flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium'
                >
                    <IoIosSearch /> 
                    Tìm kiếm
                </button>
            </div>

            {isShowModal && <Modal
                        content={content}
                        name={name}
                        setIsShowModal={setIsShowModal}
                        />}
        </>
    )
}

export default Search