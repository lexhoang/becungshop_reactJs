import * as constants_auth from '../constants/constants_auth';

const initialAuth = {
    dataAuth: [],
}

export const authReducer = (state = initialAuth, action) => {
    switch (action.type) {
        case constants_auth.GET_AUTH:
            return { ...state }
        case constants_auth.SUCCESS_AUTH:
            return {
                ...state,
                dataAuth: action.payload
            }

        case constants_auth.POST_AUTH:
            return {
                ...state,
                dataAuth: [...state.dataAuth, action.payload] // Thêm auth mới vào mảng dataAuth
            }

        case constants_auth.DELETE_AUTH:
            return {
                ...state,
                dataAuth: state.dataAuth.filter(auth => auth._id !== action.payload) // Lọc ra các phần tử khác với auth bị xóa
            }

        default:
            return state
    }
}