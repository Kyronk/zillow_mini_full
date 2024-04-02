import React, { useCallback, useEffect, useState }  from 'react'
import { SearchItem, Modal } from '../../components'
import icons from "../../utils/icons";
import { useSelector, useDispatch } from "react-redux";
// import { getCodePrice, getCodeArea } from '../../utils/Common/getCode';
// import { getCodes, getCodesArea } from '../../utils/Common/getCode';
// import * as actions from "../../store/actions";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { path } from '../../utils/constant';
import { TbTable } from 'react-icons/tb';

const {
    GrNext, 
    IoLocation,
    TbReportMoney,
    RiCrop2Line,
    FaBuilding,
    IoIosSearch,
} =  icons;

const Search = ({ }) => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()


    const { provinces, areas, prices, categories } = useSelector(state =>  state.app);
    const [ isShowModal, setIsShowModal ] = useState(false);
    const [ name, setName ] = useState("");
    const [ content, setContent ] = useState([]);
    const [ queries, setQueries ] = useState({});
    const [ arrMinMax, setArrMinMax ] = useState({});
    const [ defaultText, setDefaultText ] = useState('')


    // console.log(getCodesArea([10, 40], areas));

    // const [ texts, setTexts ] = useState({
    //     category: "",
    //     province: "",
    //     price: "",
    //     area: "",
    // })
    // console.log(getCodePrice(prices));
    // console.log(getCodeArea(areas));

    useEffect(() => {
        if (!location?.pathname?.includes(path.SEARCH)) {
            setArrMinMax({})
            setQueries({})
        }
    }, [location]);


    const handleShowModal = ( content, name, defaultText ) => {
        setContent(content);
        setName(name);
        setDefaultText(defaultText);
        setIsShowModal(true);
        // console.log(name);
    };

    
    const handleSubmit = useCallback((e, query, arrMaxMin) => {
        // e.stopPropagation();
        e.stopPropagation()
        setQueries(prev => ({...prev, ...query}));
        setIsShowModal(false);
        arrMaxMin && setArrMinMax(prev => ({...prev, ...arrMaxMin}))
    }, [isShowModal, queries]);

    // console.log(isShowModal);
    // console.log(queries);

    const handleSearch = () => {
        // const queryCodes = Object.entries(queries).filter(item => item[0].includes("Code")).filter(item => item[1] );
        // let queryCodesObj = {};
        // queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1]});
        
        // // console.log(queryCodesObj);
        // const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        // let queryTextObj = {};
        // queryText.forEach(item => { queryCodesObj[item[0]] = item[1]});
        // console.log(queryTextObj);
        
        // let titleSearch = `${queryTextObj.category
        //     ? queryTextObj.category
        //     : 'Cho thuê tất cả'} ${queryTextObj.province
        //         ? `tỉnh ${queryTextObj.province}`
        //         : ''} ${queryTextObj.price
        //             ? `giá ${queryTextObj.price}`
        //             : ''} ${queryTextObj.area
        //                 ? `diện tích ${queryTextObj.area}` : ''}`
        // console.log(titleSearch);
        // navigate({
        //     pathname: path.SEARCH,
        //     search: createSearchParams(queryCodesObj).toString(),
        // }, { state: { titleSearch } })

        // const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        // let queryCodesObj = {};
        // queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        // const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        // let queryTextObj = {};
        // console.log(queryCodes);
        // queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        // let titleSearch = `${queryTextObj.category
        //     ? queryTextObj.category
        //     : 'Cho thuê tất cả'} ${queryTextObj.province
        //         ? `tỉnh ${queryTextObj.province}`
        //         : ''} ${queryTextObj.price
        //             ? `giá ${queryTextObj.price}`
        //             : ''} ${queryTextObj.area
        //                 ? `diện tích ${queryTextObj.area}` : ''} `
        // navigate({
        //     pathname: path.SEARCH,
        //     search: createSearchParams(queryCodesObj).toString(),
        // }, { state: { titleSearch } })

        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        let queryCodesObj = {}
        queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        let queryTextObj = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        let titleSearch = `${queryTextObj.category
            ? queryTextObj.category
            : 'Cho thuê tất cả'} ${queryTextObj.province
                ? `tỉnh ${queryTextObj.province}`
                : ''} ${queryTextObj.price
                    ? `giá ${queryTextObj.price}`
                    : ''} ${queryTextObj.area
                        ? `diện tích ${queryTextObj.area}` : ''} `
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString(),
        }, { state: { titleSearch } })
    };

    return (
        <>
            <div className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span onClick={() => handleShowModal(categories,"category" ,"Tìm tất cả")} className='cursor-pointer flex-1'>
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
                    onClick={handleSearch}
                    className='outline-none py-2 px-4 w-full flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium'
                >
                    <IoIosSearch /> 
                    Tìm kiếm
                </button>
            </div>

            {isShowModal && 
                    <Modal
                        arrMinMax={arrMinMax}
                        handleSubmit={handleSubmit}
                        content={content}
                        name={name}
                        setIsShowModal={setIsShowModal}
                        queries={queries}
                        defaultText={defaultText}
                        />}
        </>
    )
}

export default Search