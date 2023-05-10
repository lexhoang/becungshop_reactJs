import * as constants_types from '../constants/constants_types';

const initialType = {
    dataTypes: []
};

export const typesReducer = (state = initialType, action) => {
    switch (action.type) {
        case constants_types.GET_TYPE:
            return {
                ...state
            }
        case constants_types.SUCCESS_TYPE:
            return {
                ...state,
                dataTypes: action.payload
            }
        default:
            return state
    }
}