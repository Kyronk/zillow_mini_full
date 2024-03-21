import React, { memo } from 'react'
// memo : nếu props nhận xuống thay đổi thì nó sẽ render lại
import icons from '../utils/icons'
// import { useSelector } from "react-redux";
import { formatVietnameseToString } from '../utils/Common/formatVietnameseToString';
import { Link } from 'react-router-dom';
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { createSearchParams, useLocation,useNavigate } from 'react-router-dom';


const { GrNext } = icons;

const ItemSidebar = ({title, content, isDouble, type}) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // biến isDouble để render thành 1 cột hay 2 cột :))

    // const { categories } = useSelector(state => state.app);

    // ví dụ arr_1 = [34, 423, 435, 676]
    // ví dụ arr_2 = [ddd, eed, rda, tad]
    /**
     * [    
     *      {
     *          left: 34,
     *          right: ddd
     *      },
     *      {   
     *          left: 423,
     *          right: eed
     *      },...
     * ]
     */

    const formatContent = () => {
        const oddEl = content?.filter((item, index) => index%2 !== 0);
        const evenEl = content?.filter((item, index) => index%2 === 0);
        const formatContent = oddEl?.map((item, index) => {
            return {
                right: item,
                left: evenEl.find((item2, index2) => index2 === index)
            }
        });

        return formatContent
    };
    // console.log(formatContent());
    const handleFilterPost = (code) => {
        dispatch(actions.getPostsLimit({ [type]: code}));
        navigate({
            pathname: "/",
            search: createSearchParams({
                type: code
            }).toString()
        })  
    }

    return (
        <div className='p-4 rounded-md bg-white w-full'>
            <h3 className='text-lg font-semibold mb-4'>{title}</h3>
                { !isDouble  && 
                    <div
                        className='flex flex-col gap-2'>
                        {content?.length > 0 && content.map(item => {
                            return (
                                <Link
                                    to={`${formatVietnameseToString(item.value)}`}
                                    key={item.code} 
                                    className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
                                        <GrNext size={10} color="#ccc" />
                                        <p>{item.value}</p>

                                </Link>
                            )
                        })}
                    </div> }

                    { isDouble  && 
                        <div className='flex flex-col gap-2'>
                            {content?.length > 0 && formatContent(content).map((item, index) => {
                                return (
                                    <div
                                        key={index} 
                                        // className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                                        >
                                        <div className='flex items-center justify-around'>
                                            <div
                                                onClick={() => handleFilterPost(item.left.code)} 
                                                className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
                                                <GrNext size={10} color="#ccc" />
                                                <p>{item.left.value}</p>
                                            </div>
                                            <div 
                                                onClick={() => handleFilterPost(item.right.code)} 
                                                className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
                                                <GrNext size={10} color="#ccc" />
                                                <p>{item.right.value}</p>
                                            </div>

                                            
                                        </div>

                                    </div>
                                )
                            })}
                    </div> }
            
        </div>
    )
}

export default memo(ItemSidebar);