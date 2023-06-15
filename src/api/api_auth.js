import * as act_auth from '../redux/actions/act_auth';
import instances from '.';

export const getDataAuth = () => {
    return async (dispatch) => {
        dispatch(act_auth.act_get_auth());
        await instances.get(`auths`)
            .then((response) => {
                // console.log(response.data);
                dispatch(act_auth.act_success_auth(response.data.data))
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}


export const postDataAuth = (auth) => {
    return async (dispatch) => {
        await instances.post(`auths/`, auth)
            .then((response) => {
                dispatch(act_auth.act_post_auth(response.data.data));
                dispatch(getDataAuth());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const patchDataAuth = (auth) => {
    return async (dispatch) => {
        await instances.patch(`auths/${auth._id}`, auth)
            .then((response) => {
                dispatch(act_auth.act_patch_auth(response.data.data));
                dispatch(getDataAuth());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const deleteDataAuth = (authID) => {
    return async (dispatch) => {
        await instances.delete(`auths/${authID}`)
            .then((response) => {
                dispatch(act_auth.act_delete_auth(response.data.data));
                dispatch(getDataAuth());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}