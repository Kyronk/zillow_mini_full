import actionTypes from "./actionTypes";
// import { apiGetCategory, apiGetPrices } from "../../services/";
// ngoài ra còn có thể import như thế này
import * as apis from "../../services";
// mỗi lần apis. gọi tới method cần phải gọi
// import { apiGetPrices } from "../../services/app";

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategory();
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


export const getPrice = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices();
        
        // console.log(response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data.response.sort((a, b) => { return +a.order - +b.order }),
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                msg: response.data.msg,
                prices: null,
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null
        })
    }
};


export const getArea = () => async (dispatch) => {
    try {
        const response = await apis.apiGetArea();
        
        // console.log(response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AREAS,
                areas: response.data.response.sort((a, b) => { return +a.order - +b.order }),
            })
        } else {
            dispatch({
                type: actionTypes.GET_AREAS,
                msg: response.data.msg,
                areas: null,
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_AREAS,
            areas: null
        })
    }
};