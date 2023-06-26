import * as act_products from '../redux/actions/act_products';
import instances from '.';


export const getDataProduct = (limit, currentPage) => {
    return async (dispatch) => {
        setTimeout(() => {
            instances.get(`products?limit=${limit}&skip=${(currentPage - 1) * limit}`)
                .then((response) => {
                    const { data, totalPages } = response.data;
                    dispatch(act_products.act_product_success(data, totalPages));
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
        }, 300); // Delay of 1000 milliseconds (1 second)
    }
}

export const filterDataProduct = (name, type, productFor) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.get(`products?name=${name}&type=${type}&productFor=${productFor}`)
            .then((response) => {
                dispatch(act_products.act_product_success(response.data.data))
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const postDataProduct = (product) => {
    return async (dispatch) => {
        await instances.post(`products/`, product)
            .then((response) => {
                dispatch(act_products.act_product_post(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const putDataProduct = (product) => {
    return async (dispatch) => {
        await instances.put(`products/${product._id}`, product)
            .then((response) => {
                dispatch(act_products.act_product_put(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const patchDataProduct = (IdProduct, EditAmount) => {
    return async (dispatch) => {
        await instances.patch(`products/${IdProduct}`, EditAmount)
            .then((response) => {
                dispatch(act_products.act_product_patch(response.data.data));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const deleteDataProduct = (IdProduct) => {
    return async (dispatch) => {
        await instances.delete(`products/${IdProduct}`)
            .then((response) => {
                dispatch(act_products.act_product_delete(IdProduct))
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}