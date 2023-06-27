import * as constants_products from '../constants/constants_products';

const initialProducts = {
    loading: false,
    dataProducts: [],
    totalPages: 0
}

export const productsReducer = (state = initialProducts, action) => {
    switch (action.type) {
        case constants_products.GET_PRODUCT:
            return {
                ...state,
                loading: true
            }
        case constants_products.SUCCESS_PRODUCT:
            return {
                ...state,
                loading: false,
                dataProducts: action.payload.product,
                totalPages: action.payload.totalPages
            }

        case constants_products.POST_PRODUCT:
            // console.log(action.payload)
            return {
                ...state,
                loading: false,
                dataProducts: [...state.dataProducts, action.payload] // Thêm auth mới vào mảng dataAuth
            }

        case constants_products.PUT_PRODUCT:
            // console.log(action.payload)
            return {
                ...state,
                loading: false,
                dataProducts: state.dataProducts.map((product) => {
                    if (product._id === action.payload._id) {
                        return action.payload;
                    }
                    return product;
                })
            }

        case constants_products.PATCH_PRODUCT:
            return {
                ...state,
                loading: false,
                dataProducts: state.dataProducts.map((product) => {
                    if (product._id === action.payload._id) {
                        return action.payload;
                    }
                    return product;
                })
            };

        case constants_products.DELETE_PRODUCT:
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                dataProducts: state.dataProducts.filter(product => product._id !== action.payload) // Lọc ra các phần tử khác với auth bị xóa
            }
        default:
            return state;
    }
}