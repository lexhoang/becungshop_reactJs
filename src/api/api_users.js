import * as act_users from '../redux/actions/act_users';
import instances from '.';

export const getDataUser = () => {
    return async (dispatch) => {
        dispatch(act_users.act_get_user());
        await instances.get(`users`)
            .then((response) => {
                // console.log(response.data);
                dispatch(act_users.act_success_user(response.data.data))
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}


export const postDataUser = (user) => {
    return async (dispatch) => {
        await instances.post(`users/`, user)
            .then((response) => {
                dispatch(act_users.act_post_user(response.data.data));
                dispatch(getDataUser());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const patchDataUser = (user) => {
    return async (dispatch) => {
        await instances.patch(`users/${user._id}`, user)
            .then((response) => {
                dispatch(act_users.act_patch_user(response.data.data));
                dispatch(getDataUser());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const deleteDataUser = (userID) => {
    return async (dispatch) => {
        await instances.delete(`users/${userID}`)
            .then((response) => {
                dispatch(act_users.act_delete_user(response.data.data));
                dispatch(getDataUser());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}