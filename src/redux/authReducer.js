import {AUTH_SUCCESS, LOGIN, SHOW_CONTENT} from "./types";


const initialState = {
    data:null,
    message:null
}

export default function authReducer(state = initialState,action){
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, data: action.data,
            }
        case SHOW_CONTENT:
            return {
                ...state, message: action.data
            }
        case LOGIN:
            return {
                ...state
            }
        default:
            return state
    }
}
