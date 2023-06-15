import * as constants_auth from '../constants/constans_auth';

const initialUser = {
    dataAuth: []
}

export const authReducer = (state = initialUser, action) => {
    switch (action.type) {
        case constants_auth.GET_AUTH:
            return { ...state }
        case constants_auth.SUCCESS_AUTH:
            return {
                ...state,
                dataAuth: action.payload
            }
        default:
            return state
    }
}