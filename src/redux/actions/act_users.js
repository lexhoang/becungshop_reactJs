import * as constants_users from '../constants/constans_users';

export const act_get_user = () => {
    return {
        type: constants_users.GET_USER
    }
}

export const act_success_user = (user) => {
    return {
        type: constants_users.SUCCESS_USER,
        payload: user
    }
}


export const act_post_user = (user) => {
    return {
        type: constants_users.POST_USER,
        payload: user
    }
}

export const act_delete_user = (ID) => {
    return {
        type: constants_users.DELETE_USER,
        payload: ID
    }
}