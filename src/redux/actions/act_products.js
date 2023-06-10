import * as constants_products from '../constants/constants_products';

export const act_product_get = () => {
    return {
        type: constants_products.GET_PRODUCT
    }
}

export const act_product_success = (product, totalPages) => {
    return {
        type: constants_products.SUCCESS_PRODUCT,
        payload: { product, totalPages }
    }
}

export const act_product_port = (product) => {
    return {
        type: constants_products.POST_PRODUCT,
        payload: product
    }
}

export const act_product_put = (product) => {
    return {
        type: constants_products.PUT_PRODUCT,
        payload: product
    }
}

export const act_product_delete = (IdProduct) => {
    return {
        type: constants_products.DELETE_PRODUCT,
        payload: IdProduct
    }
}