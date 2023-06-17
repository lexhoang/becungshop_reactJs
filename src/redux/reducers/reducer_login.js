import * as constants_login from '../constants/constants_login';

const initialLogin = {
    user: null
}

export const loginReducer = (state = initialLogin, action) => {
    switch (action.type) {
        case constants_login.USER:
            return { ...state }
        case constants_login.LOGIN:
            return {
                user: action.payload
            }
        default:
            return state
    }
}