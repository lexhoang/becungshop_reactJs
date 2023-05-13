const initialFilter = {
    searchName: '',
    searchType: '',
    searchProductFor: ''
}

export const filterReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case "VALUE_NAME_PRODUCT": {
            return {
                ...state,
                searchName: action.payload,
            }
        }
        case "VALUE_PRODUCT_TYPES": {
            return {
                ...state,
                searchType: action.payload,
            }
        }
        case "VALUE_PRODUCT_FOR": {
            return {
                ...state,
                searchProductFor: action.payload,
            }
        }
        default:
            return state;
    }
}