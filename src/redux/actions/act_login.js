import * as constants_login from '../constants/constants_login';

export const act_user = () => {
    return {
        type: constants_login.USER,
    }
}

export const act_login = (user, password) => {
    return {
        type: constants_login.LOGIN,
        payload: { user, password }
    }
}

export const act_logout = () => {
    return {
        type: constants_login.LOGOUT,
    }
}