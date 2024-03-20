import actionTypes from "../actions/actionTypes";

const initState = {
    msg: "",
    categories: []
}


const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
        // case actionTypes.GET_POSTS_LIMIT:
            return {
                ...state,
                categories: action.categories || [],
                msg: action.msg || "",
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


export default appReducer;