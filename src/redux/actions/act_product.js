import * as constants_product from '../constants/constants_product';

export const act_product_get = () => {
    return {
        type: constants_product.GET_PRODUCT
    }
}

export const act_product_success = (product) => {
    return {
        type: constants_product.SUCCESS_PRODUCT,
        payload: product
    }
}

export const act_product_port = (product) => {
    return {
        type: constants_product.POST_PRODUCT,
        payload: product
    }
}

export const act_product_put = (product) => {
    return {
        type: constants_product.PUT_PRODUCT,
        payload: product
    }
}

export const act_product_delete = (IdProduct) => {
    return {
        type: constants_product.DELETE_PRODUCT,
        payload: IdProduct
    }
}