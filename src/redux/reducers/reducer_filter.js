import * as constants_filter from '../constants/constants_filter';

const initialFilter = {
    searchName: '',
    searchType: '',
    searchProductFor: ''
}

export const filterReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case constants_filter.FILTER_NAME: {
            return {
                ...state,
                searchName: action.payload,
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
        default:
            return state;
    }
}