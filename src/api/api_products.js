import * as act_products from '../redux/actions/act_products';
import instances from '.';


export const getDataProduct = () => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.get(`products`)
            .then((response) => {
                // console.log(response.data);
                dispatch(act_products.act_product_success(response.data.data))
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

export const postDataProduct = (product) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.post(`products/`, product)
            .then((response) => {
                dispatch(act_products.act_product_port(response.data.data));
                dispatch(getDataProduct());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const putDataProduct = (product) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.put(`products/${product._id}`, product)
            .then((response) => {
                dispatch(act_products.act_product_put(response.data.data));
                dispatch(getDataProduct());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}

export const deleteDataProduct = (IdProduct) => {
    return async (dispatch) => {
        dispatch(act_products.act_product_get());
        await instances.delete(`products/${IdProduct}`)
            .then((response) => {
                dispatch(act_products.act_product_delete(IdProduct))
                dispatch(getDataProduct());
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }
}