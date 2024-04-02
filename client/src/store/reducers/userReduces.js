import actionsTypes  from "../actions/actionTypes"

const initState = {
    // isLoggedIn: false,
    currentData: {},
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionsTypes.GET_CURRENT:
            return {
                ...state,
                currentData: action.currentData || {}
            }
        
        case actionsTypes.LOGOUT:
            return {
                ...state,
                currentData: {}
            }


        default: 
            return state;
    }
}

export default userReducer;
