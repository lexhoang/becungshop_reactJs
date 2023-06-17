import * as constants_auth from '../constants/constants_auth';

const initialAuth = {
    dataAuth: [],
    user: null
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
        default:
            return state
    }
}