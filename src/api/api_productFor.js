import * as act_productFor from '../redux/actions/act_productFor';
import instances from '.';


export const getDataProductFor = () => {
    return async (dispatch) => {
        await instances.get(`productfor`)
            .then((response) => {
                dispatch(act_productFor.act_productFor_success(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const postDataProductFor = (productFor) => {
    return async (dispatch) => {
        await instances.post(`productfor/`, productFor)
            .then((response) => {
                dispatch(act_productFor.act_productFor_post(response.data.data));
                dispatch(getDataProductFor());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const putDataProductFor = (productFor) => {

    return async (dispatch) => {
        await instances.put(`productfor/${productFor._id}`, productFor)
            .then((response) => {
                dispatch(act_productFor.act_productFor_put(response.data.data));
                dispatch(getDataProductFor());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const deleteDataProductFor = (IdProductFor) => {
    return async (dispatch) => {
        await instances.delete(`productfor/${IdProductFor}`)
            .then((response) => {
                dispatch(act_productFor.act_productFor_delete(response.data.data));
                dispatch(getDataProductFor());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}