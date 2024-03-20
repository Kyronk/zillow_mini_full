import actionTypes from "./actionTypes";
import { apiGetCategory } from "../../services/category";

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apiGetCategory();
        // console.log(response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg,
                categories: null,
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null
        })
    }
};