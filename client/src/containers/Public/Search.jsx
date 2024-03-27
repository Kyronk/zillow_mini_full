import React, { useCallback, useState }  from 'react'
import { SearchItem, Modal } from '../../components'
import icons from "../../utils/icons";
import { useSelector } from "react-redux";
import { getCodePrice, getCodeArea } from '../../utils/Common/getCode';

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
    const [ queries, setQueries ] = useState({});
    // const [ texts, setTexts ] = useState({
    //     category: "",
    //     province: "",
    //     price: "",
    //     area: "",
    // })
    console.log(getCodePrice(prices));
    console.log(getCodeArea(areas));


    const handleShowModal = ( content, name, defaultText ) => {
        setContent(content);
        setName(name);
        setIsShowModal(true);
        // console.log(name);
    };

    
    const handleSubmit = useCallback((e, query) => {
        e.stopPropagation();
        setQueries(prev => ({...prev, ...query}));
        setIsShowModal(false);
    }, [isShowModal, queries]);

    // console.log(isShowModal);
    console.log(queries);

    return (
        <>
            <div className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span onClick={() => handleShowModal(categories,"category" ,"Phòng trọ, nhà trọ")} className='cursor-pointer flex-1'>
                    <SearchItem 
                        text={queries.category}
                        defaultText={'Tìm tất cả'}
                        iconAfter={<GrNext />}
                        fontWeight
                        iconBefore={<FaBuilding />}
                    />
                </span>

                <span onClick={() => handleShowModal(provinces, "province", "Toàn quốc")} className='cursor-pointer flex-1'>
                    <SearchItem 
                        text={queries.province }
                        defaultText={'Toàn quốc'}
                        iconAfter={<GrNext />}
                        iconBefore={<IoLocation />}
                    />
                </span>

                <span onClick={() => handleShowModal(prices, "price", "Chọn giá")} className='cursor-pointer flex-1'>
                    <SearchItem 
                        text={queries.price}
                        defaultText={'Chọn giá'}
                        iconAfter={<GrNext />}
                        iconBefore={<TbReportMoney />}
                    />
                </span>

                <span onClick={() => handleShowModal(areas, "area", "Chọn diện tích")} className='cursor-pointer flex-1'>
                    <SearchItem 
                        text={queries.area }
                        defaultText={'Chọn diện tích'}
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

            {isShowModal && 
                    <Modal
                        handleSubmit={handleSubmit}
                        content={content}
                        name={name}
                        setIsShowModal={setIsShowModal}
                        queries={queries}
                        />}
        </>
    )
}

export default Search