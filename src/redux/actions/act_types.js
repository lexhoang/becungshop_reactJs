import * as constants_types from '../constants/constants_types';

export const act_type_get = () => {
    return {
        type: constants_types.GET_TYPE
    }
}

export const act_type_success = (type) => {
    return {
        type: constants_types.SUCCESS_TYPE,
        payload: type
    }
}

export const act_type_post = (type) => {
    return {
        type: constants_types.POST_TYPE,
        payload: type
    }
}

export const act_type_put = (type) => {
    return {
        type: constants_types.PUT_TYPE,
        payload: type
    }
}

export const act_type_delete = (IdType) => {
    return {
        type: constants_types.DELETE_TYPE,
        payload: IdType
    }
}