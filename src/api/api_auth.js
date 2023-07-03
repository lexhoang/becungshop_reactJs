import * as act_auth from '../redux/actions/act_auth';
import instances from '.';

export const getDataAuth = (limit, currentPage) => {
    return async (dispatch) => {
        // setTimeout(() => {
        await instances.get(`auths?limit=${limit}&skip=${(currentPage - 1) * limit}`)
            .then((response) => {
                const { data, totalPagesAuth } = response.data;
                const reversedData = [...data].reverse();
                dispatch(act_auth.act_success_auth(reversedData, totalPagesAuth));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
        // }, 300);
    }
}

export const filterUser = (account, userName, phone, limit, currentPage) => {
    return async (dispatch) => {
        // dispatch(act_auth.act_get_auth());
        await instances.get(`auths?account=${account}&name=${userName}&phone=${phone}&limit=${limit}&skip=${(currentPage - 1) * limit}`)
            .then((response) => {
                const { data, totalPagesAuth } = response.data;
                const reversedData = [...data].reverse();
                dispatch(act_auth.act_success_auth(reversedData, totalPagesAuth));
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
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const putDataAuth = (auth) => {
    return async (dispatch) => {
        await instances.put(`auths/${auth._id}`, auth)
            .then((response) => {
                dispatch(act_auth.act_put_auth(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const patchDataAuth = (userId, dataProduct) => {
    return async (dispatch) => {
        await instances.patch(`auths/${userId}`, dataProduct)
            .then((response) => {
                dispatch(act_auth.act_patch_auth(response.data.data));
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
                dispatch(act_auth.act_delete_auth(authID));
                // dispatch(getDataAuth());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}