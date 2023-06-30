import * as constants_filter from '../constants/constants_filter';

export const filter_product = (product) => {
    return {
        type: constants_filter.FILTER_PRODUCT,
        payload: product
    }
}
export const filter_code_product = (codeProduct) => {
    return {
        type: constants_filter.FILTER_CODE_PRODUCT,
        payload: codeProduct
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
export const filter_userName = (userName) => {
    return {
        type: constants_filter.FILTER_USERNAME,
        payload: userName
    }
}
export const filter_phone = (phone) => {
    return {
        type: constants_filter.FILTER_PHONE,
        payload: phone
    }
}


export const filter_account_order = (account) => {
    return {
        type: constants_filter.FILTER_ACCOUNT_ORDER,
        payload: account
    }
}
export const filter_name_order = (name) => {
    return {
        type: constants_filter.FILTER_NAME_ORDER,
        payload: name
    }
}
export const filter_phone_order = (phone) => {
    return {
        type: constants_filter.FILTER_PHONE_ORDER,
        payload: phone
    }
}
export const filter_address_order = (address) => {
    return {
        type: constants_filter.FILTER_ADDRESS_ORDER,
        payload: address
    }
}