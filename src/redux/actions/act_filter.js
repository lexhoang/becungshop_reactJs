import * as constants_filter from '../constants/constants_filter';

export const filter_product = (product) => {
    return {
        type: constants_filter.FILTER_PRODUCT,
        payload: product
    }
}

export const filter_type = (type) => {
    return {
        type: constants_filter.FILTER_TYPE,
        payload: type
    }
}

export const filter_productFor = (productFor) => {
    return {
        type: constants_filter.FILTER_PRODUCT_FOR,
        payload: productFor
    }
}

export const filter_account = (account) => {
    return {
        type: constants_filter.FILTER_ACCOUNT,
        payload: account
    }
}