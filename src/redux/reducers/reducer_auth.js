import * as constants_auth from '../constants/constants_auth';

const initialAuth = {
    loading: false,
    dataAuth: [],
    totalPagesAuth: 0
}

export const authReducer = (state = initialAuth, action) => {
    switch (action.type) {
        case constants_auth.GET_AUTH:
            return {
                ...state,
                loading: true
            }
        case constants_auth.SUCCESS_AUTH:
            return {
                ...state,
                loading: false,
                dataAuth: action.payload.auth,
                totalPagesAuth: action.payload.totalPagesAuth
            }


        case constants_auth.POST_AUTH:
            return {
                ...state,
                loading: false,
                dataAuth: [...state.dataAuth, action.payload] // Thêm auth mới vào mảng dataAuth
            }

        case constants_auth.PUT_AUTH:
            return {
                ...state,
                loading: false,
                dataAuth: state.dataAuth.map((auth) => {
                    if (auth._id === action.payload._id) {
                        return action.payload;
                    }
                    return auth;
                })
            }

        case constants_auth.PATCH_AUTH:
            return {
                ...state,
                loading: false,
                dataAuth: state.dataAuth.map((auth) => {
                    if (auth._id === action.payload._id) {
                        return action.payload;
                    }
                    return auth;
                })
            }

        case constants_auth.DELETE_AUTH:
            console.log(action.payload);
            console.log(state.dataAuth);
            return {
                ...state,
                loading: false,
                dataAuth: state.dataAuth.filter(auth => auth._id !== action.payload) // Lọc ra các phần tử khác với auth bị xóa
            }

        default:
            return state
    }
}