import * as constants_filter from '../constants/constants_filter';

const initialFilter = {
    searchProduct: '',
    searchCodeProduct: '',
    searchType: '',
    searchProductFor: '',
    searchAccount: '',
    searchUserName: '',
    searchPhone: '',
    searchAccountOrder: '',
    searchNameOrder: '',
    searchPhoneOrder: '',
    searchAddressOrder: '',
}

export const filterReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case constants_filter.FILTER_PRODUCT: {
            return {
                ...state,
                searchProduct: action.payload,
            }
        }
        case constants_filter.FILTER_CODE_PRODUCT: {
            return {
                ...state,
                searchCodeProduct: action.payload,
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
        case constants_filter.FILTER_USERNAME: {
            return {
                ...state,
                searchUserName: action.payload,
            }
        }
        case constants_filter.FILTER_PHONE: {
            return {
                ...state,
                searchPhone: action.payload,
            }
        }

        case constants_filter.FILTER_ACCOUNT_ORDER: {
            return {
                ...state,
                searchAccountOrder: action.payload,
            }
        }
        case constants_filter.FILTER_NAME_ORDER: {
            return {
                ...state,
                searchNameOrder: action.payload,
            }
        }
        case constants_filter.FILTER_PHONE_ORDER: {
            return {
                ...state,
                searchPhoneOrder: action.payload,
            }
        }
        case constants_filter.FILTER_ADDRESS_ORDER: {
            return {
                ...state,
                searchAddressOrder: action.payload,
            }
        }

        default:
            return state;
    }
}