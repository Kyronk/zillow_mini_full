import React from 'react'
import { SearchItem, Modal } from '../../components'
import icons from "../../utils/icons";

const {GrNext, 
    IoLocation,
    TbReportMoney,
    RiCrop2Line,
    FaBuilding,
    IoIosSearch,
} =  icons;

const Search = () => {
    return (
        <>
            <div className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <SearchItem 
                    text={"Phòng trọ, nhà trọ"}
                    iconAfter={<GrNext />}
                    fontWeight
                    iconBefore={<FaBuilding />}
                />
                <SearchItem 
                    text={"Toàn quốc"}
                    iconAfter={<GrNext />}
                    iconBefore={<IoLocation />}
                />
                <SearchItem 
                    text={"Chọn giá"}
                    iconAfter={<GrNext />}
                    iconBefore={<TbReportMoney />}
                />
                <SearchItem 
                    text={"Chọn diện tích"}
                    iconAfter={<GrNext />}
                    iconBefore={<RiCrop2Line />}
                />
                <button
                    type="button"
                    className='outline-none py-2 px-4 w-full bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium'
                >
                    <IoIosSearch /> 
                    Tìm kiếm
                </button>
            </div>

            <Modal />
        </>
    )
}

export default Search