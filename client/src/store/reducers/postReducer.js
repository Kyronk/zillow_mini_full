import actionTypes from "../actions/actionTypes";

const initState = {
    posts: [],
    msg: "",
    count: 0,
    newPosts: [],
    postsOfCurrent: [],
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || "",
                count: action.count || 0
            }

        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                newPosts: action.newPosts || [],
                msg: action.msg || "",
                // count: action.count || 0
            }

        case actionTypes.GET_POSTS_ADMIN:
            return {
                ...state,
                postsOfCurrent: action.posts || [],
                msg: action.msg || "",
                // count: action.count || 0
            }

        // case actionTypes.GET_POSTS_LIMIT:
        //     return {
        //         ...state,
        //         posts: action.posts || [],
        //         msg: action.msg || ""
        //     }


        default:
            return state;
    }
};


export default postReducer;