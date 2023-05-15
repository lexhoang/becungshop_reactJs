import * as constants_filter from '../constants/constants_filter';

export const filter_name = (name) => {
    return {
        type: constants_filter.FILTER_NAME,
        payload: name
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