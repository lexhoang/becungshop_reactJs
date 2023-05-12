import * as constants_products from '../constants/constants_products';

const initialProducts = {
    dataProducts: [],
}

export const productsReducer = (state = initialProducts, action) => {
    switch (action.type) {
        case constants_products.GET_PRODUCT:
            return {
                ...state,
            }
        case constants_products.SUCCESS_PRODUCT:
            return {
                ...state,
                dataProducts: action.payload
            }
        default:
            return state;
    }
}