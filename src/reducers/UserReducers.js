import 
    {
        USER_LOGIN_REQUEST, 
        USER_LOGIN_SUCCESS, 
        USER_LOGIN_FAIL, 
        USER_SIGNUP_REQUEST,
        USER_SIGNUP_SUCCESS, 
        USER_SIGNUP_FAIL,
        USER_LOGOUT
    } 
from '../constants/UserConstants'

export const userSignupReducers = (state={}, action) => {
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {...state, loading: true}
        case USER_SIGNUP_SUCCESS:
            return {...state, loading: false, userInfo:action.payload}
        case USER_SIGNUP_FAIL:
            return {...state, loading: false, error:action.payload}

        default:
            return state
    }
}


export const userLoginReducers = (state={}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {...state, loading: true}
        case USER_LOGIN_SUCCESS:
            return {...state, loading: false, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {...state, loading: false, error:action.payload}
        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}