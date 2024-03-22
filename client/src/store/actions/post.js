import actionTypes from "./actionTypes";
import { apiGetPost, apiGetPostLimit } from "../../services/post";

export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPost();
        // console.log(response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null
        })
    }
};

export const getPostsLimit = (query) => async (dispatch) => {
    console.log(query);
    try {
        const response = await apiGetPostLimit(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })
    }
};