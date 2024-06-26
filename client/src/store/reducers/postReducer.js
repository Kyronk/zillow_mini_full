import actionTypes from "../actions/actionTypes";

const initState = {
    posts: [],
    msg: "",
    count: 0,
    newPosts: [],
    postsOfCurrent: [],
    dataEdit: null,
    outStandingPost: [],
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


        case actionTypes.GET_OUTSTANDING:
            return {
                ...state,
                outStandingPost: action.outStandingPost || [],
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

        case actionTypes.EDIT_DATA:
            return {
                ...state,
                dataEdit: action.dataEdit || null
            }

        case actionTypes.RESET_DATAEDIT:
            return {
                ...state,
                dataEdit: null
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