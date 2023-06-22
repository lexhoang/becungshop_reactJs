import * as constants_filter from '../constants/constants_filter';

const initialFilter = {
    searchProduct: '',
    searchType: '',
    searchProductFor: '',
    searchAccount: ''
}

export const filterReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case constants_filter.FILTER_PRODUCT: {
            return {
                ...state,
                searchProduct: action.payload,
            }
        }
        case constants_filter.FILTER_TYPE: {
            return {
                ...state,
                searchType: action.payload,
            }
        }
        case constants_filter.FILTER_PRODUCT_FOR: {
            return {
                ...state,
                searchProductFor: action.payload,
            }
        }
        case constants_filter.FILTER_ACCOUNT: {
            return {
                ...state,
                searchAccount: action.payload,
            }
        }
        default:
            return state;
    }
}