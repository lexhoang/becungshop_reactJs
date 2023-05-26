import * as constants_users from '../constants/constans_users';

const initialUser = {
    dataUsers: []
}

export const usersReducer = (state = initialUser, action) => {
    switch (action.type) {
        case constants_users.GET_USER:
            return { ...state }
        case constants_users.SUCCESS_USER:
            return {
                ...state,
                dataUsers: action.payload
            }
        default:
            return state
    }
}