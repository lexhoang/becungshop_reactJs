import * as constants_orders from '../constants/constants_order';

const initialOrder = {
    loading: false,
    dataOrder: [],
    totalPagesOrder: 0
}

export const orderReducer = (state = initialOrder, action) => {
    switch (action.type) {
        case constants_orders.GET_ORDER:
            return {
                ...state,
                loading: true
            }
        case constants_orders.SUCCESS_ORDER:
            return {
                ...state,
                loading: false,
                dataOrder: action.payload.auth,
                totalPagesOrder: action.payload.totalPagesOrder
            }


        case constants_orders.POST_ORDER:
            return {
                ...state,
                loading: false,
                dataOrder: [action.payload, ...state.dataOrder]
            }

        case constants_orders.PUT_ORDER:
            return {
                ...state,
                loading: false,
                dataOrder: state.dataOrder.map((auth) => {
                    if (auth._id === action.payload._id) {
                        return action.payload;
                    }
                    return auth;
                })
            }

        case constants_orders.PATCH_ORDER:
            return {
                ...state,
                loading: false,
                dataOrder: state.dataOrder.map((auth) => {
                    if (auth._id === action.payload._id) {
                        return action.payload;
                    }
                    return auth;
                })
            }

        case constants_orders.DELETE_ORDER:
            console.log(action.payload);
            console.log(state.dataOrder);
            return {
                ...state,
                loading: false,
                dataOrder: state.dataOrder.filter(auth => auth._id !== action.payload)
            }

        default:
            return state
    }
}