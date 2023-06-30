import * as constants_orders from '../constants/constants_orders';

export const act_get_order = () => {
    return {
        type: constants_orders.GET_ORDER
    }
}

export const act_success_order = (auth, totalPagesAuth) => {
    return {
        type: constants_orders.SUCCESS_ORDER,
        payload: { auth, totalPagesAuth }
    }
}

export const act_post_order = (auth) => {
    return {
        type: constants_orders.POST_ORDER,
        payload: auth
    }
}

export const act_patch_order = (auth) => {
    return {
        type: constants_orders.PATCH_ORDER,
        payload: auth
    }
}

export const act_put_order = (auth) => {
    return {
        type: constants_orders.PUT_ORDER,
        payload: auth
    }
}

export const act_delete_order = (ID) => {
    return {
        type: constants_orders.DELETE_ORDER,
        payload: ID
    }
}