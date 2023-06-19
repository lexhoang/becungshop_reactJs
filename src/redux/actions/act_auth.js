import * as constants_auths from '../constants/constants_auth';

export const act_get_auth = () => {
    return {
        type: constants_auths.GET_AUTH
    }
}

export const act_success_auth = (auth) => {
    return {
        type: constants_auths.SUCCESS_AUTH,
        payload: auth
    }
}

export const act_post_auth = (auth) => {
    return {
        type: constants_auths.POST_AUTH,
        payload: auth
    }
}

export const act_patch_auth = (auth) => {
    return {
        type: constants_auths.PATCH_AUTH,
        payload: auth
    }
}

export const act_put_auth = (auth) => {
    return {
        type: constants_auths.PUT_AUTH,
        payload: auth
    }
}

export const act_delete_auth = (ID) => {
    return {
        type: constants_auths.DELETE_AUTH,
        payload: ID
    }
}