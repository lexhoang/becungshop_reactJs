import * as act_orders from '../redux/actions/act_orders';
import instances from '.';

export const getDataOrder = (limit, currentPage) => {
    return async (dispatch) => {
        // setTimeout(() => {
        await instances.get(`orders?limit=${limit}&skip=${(currentPage - 1) * limit}`)
            .then((response) => {
                const { data, totalPagesAuth } = response.data;
                const reversedData = [...data].reverse();
                dispatch(act_orders.act_success_order(reversedData, totalPagesAuth));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
        // }, 300);
    }
}

export const filterOrder = (accountName, name, phone, address, limit, currentPage) => {
    return async (dispatch) => {
        await instances.get(`orders?accountName=${accountName}&name=${name}&phone=${phone}&address=${address}&limit=${limit}&skip=${(currentPage - 1) * limit}`)
            .then((response) => {
                const { data, totalPagesAuth } = response.data;
                const reversedData = [...data].reverse();
                dispatch(act_orders.act_success_order(reversedData, totalPagesAuth));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}


export const postDataOrder = (order) => {
    return async (dispatch) => {
        await instances.post(`orders/`, order)
            .then((response) => {
                dispatch(act_orders.act_post_order(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const putDataOrder = (order) => {
    return async (dispatch) => {
        await instances.put(`orders/${order._id}`, order)
            .then((response) => {
                dispatch(act_orders.act_put_order(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const patchDataOrder = (userId, dataOrder) => {
    return async (dispatch) => {
        await instances.patch(`orders/${userId}`, dataOrder)
            .then((response) => {
                dispatch(act_orders.act_patch_order(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const deleteDataOrder = (orderID) => {
    return async (dispatch) => {
        await instances.delete(`orders/${orderID}`)
            .then((response) => {
                dispatch(act_orders.act_delete_order(orderID));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}