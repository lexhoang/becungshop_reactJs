import * as constants_productFor from '../constants/constants_productFor';

const initialProductFor = {
    dataProductFor: [],
}

export const productForReducer = (state = initialProductFor, action) => {
    switch (action.type) {
        case constants_productFor.GET_PRODUCT_FOR:
            return {
                ...state,
            }
        case constants_productFor.SUCCESS_PRODUCT_FOR:
            return {
                ...state,
                dataProductFor: action.payload
            }
        default:
            return state;
    }
}