import * as act_products from '../redux/actions/act_products';

import instances from '.';



export const getDataProduct = (limit, currentPage) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.get(`products?limit=${limit}&skip=${(currentPage - 1) * limit}`)
            .then((response) => {
                // console.log(response.data);
                const { data, totalPages } = response.data;
                dispatch(act_products.act_product_success(data, totalPages))
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const filterDataProduct = (name, type, productFor) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.get(`products?name=${name}&type=${type}&productFor=${productFor}`)
            .then((response) => {
                // console.log(response.data);
                dispatch(act_products.act_product_success(response.data.data))
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const postDataProduct = (product, limit, currentPage) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.post(`products/`, product)
            .then((response) => {
                dispatch(act_products.act_product_port(response.data.data));
                dispatch(getDataProduct(limit, currentPage));
                // const newProducts = [...dataProducts]
                // newProducts.push(response.data.data)
                // dispatch(act_products.act_product_success(newProducts))
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const putDataProduct = (product, limit, currentPage) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.put(`products/${product._id}`, product)
            .then((response) => {
                dispatch(act_products.act_product_put(response.data.data));
                dispatch(getDataProduct(limit, currentPage));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const patchDataProduct = (IdProduct, EditAmount) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.patch(`products/${IdProduct}`, EditAmount)
            .then((response) => {
                dispatch(act_products.act_product_patch(response.data.data));
                // dispatch(getDataProduct(limit, currentPage));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const deleteDataProduct = (IdProduct, limit, currentPage) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.delete(`products/${IdProduct}`)
            .then((response) => {
                dispatch(act_products.act_product_delete(IdProduct))
                dispatch(getDataProduct(limit, currentPage));
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}