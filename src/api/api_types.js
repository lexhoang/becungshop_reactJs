import * as act_types from '../redux/actions/act_types';
import instances from '.';


export const getDataType = () => {
    return async (dispatch) => {
        await instances.get(`types`)
            .then((response) => {
                dispatch(act_types.act_type_success(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const filterDataType = (name) => {
    return async (dispatch) => {
        await instances.get(`types?name=${name}`)
            .then((response) => {
                dispatch(act_types.act_type_success(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const postDataType = (type) => {
    return async (dispatch) => {
        await instances.post(`types/`, type)
            .then((response) => {
                dispatch(act_types.act_type_post(response.data.data));
                dispatch(getDataType());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const putDataType = (type) => {

    return async (dispatch) => {
        await instances.put(`types/${type._id}`, type)
            .then((response) => {
                dispatch(act_types.act_type_put(response.data.data));
                dispatch(getDataType());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const deleteDataType = (IdType) => {
    return async (dispatch) => {
        await instances.delete(`types/${IdType}`)
            .then((response) => {
                dispatch(act_types.act_type_delete(response.data.data));
                dispatch(getDataType());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}