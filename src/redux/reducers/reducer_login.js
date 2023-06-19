import * as constants_login from '../constants/constants_login';



const initialLogin = {
    user: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null,
    password: null,
}

export const loginReducer = (state = initialLogin, action) => {
    switch (action.type) {
        case constants_login.USER:
            return { ...state }

        case constants_login.LOGIN:
            {
                let userLogin = JSON.stringify(action.payload.user)
                localStorage.setItem("user", userLogin)
                return {
                    ...state,
                    user: action.payload.user,
                    password: action.payload.password
                }
            }

        case constants_login.LOGOUT:
            {
                localStorage.removeItem("user")
                return {
                    ...state,
                    user: null
                }
            }

        default:
            return state
    }
}