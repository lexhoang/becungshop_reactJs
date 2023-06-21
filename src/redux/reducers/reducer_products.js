import * as constants_products from '../constants/constants_products';

const initialProducts = {
    dataProducts: [],
    totalPages: 0
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
                dataProducts: action.payload.product,
                totalPages: action.payload.totalPages
            }

        case constants_products.POST_PRODUCT:
            return {
                ...state,
                dataProducts: [action.payload, ...state.dataProducts] // Thêm auth mới vào mảng dataAuth
            }

        case constants_products.PUT_PRODUCT:
            return {
                ...state,
                dataProducts: state.dataProducts.map((product) => {
                    if (product._id === action.payload._id) {
                        return action.payload;
                    }
                    return product;
                })
            };

        case constants_products.DELETE_PRODUCT:
            return {
                ...state,
                dataProducts: state.dataProducts.filter(product => product._id !== action.payload) // Lọc ra các phần tử khác với auth bị xóa
            }
        default:
            return state;
    }
}