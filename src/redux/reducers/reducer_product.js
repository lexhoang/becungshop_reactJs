import * as constants_product from '../constants/constants_product';

const initialProduct = {
    dataProduct: [],
}

export const productReducer = (state = initialProduct, action) => {
    switch (action.type) {
        case constants_product.GET_PRODUCT:
            return {
                ...state,
            }
        case constants_product.SUCCESS_PRODUCT:
            return {
                ...state,
                dataProduct: action.payload
            }
        default:
            return state;
    }
}