import * as constants_productFor from '../constants/constants_productFor';

export const act_productFor_get = () => {
    return {
        type: constants_productFor.GET_PRODUCT_FOR
    }
}

export const act_productFor_success = (productFor) => {
    return {
        type: constants_productFor.SUCCESS_PRODUCT_FOR,
        payload: productFor
    }
}
export const act_productFor_port = (productFor) => {
    return {
        type: constants_productFor.POST_PRODUCT_FOR,
        payload: productFor
    }
}
export const act_productFor_delete = (IdProductFor) => {
    return {
        type: constants_productFor.DELETE_PRODUCT_FOR,
        payload: IdProductFor
    }
}