import * as constants_login from '../constants/constants_login';

export const act_user = () => {
    return {
        type: constants_login.USER,
    }
}

export const act_login = (user) => {
    return {
        type: constants_login.LOGIN,
        payload: user
    }
}