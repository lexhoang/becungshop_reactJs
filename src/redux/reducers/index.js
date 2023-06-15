import { combineReducers } from "redux";
import { typesReducer } from "./reducer_types";
import { productsReducer } from "./reducer_products";
import { authReducer } from "./reducer_auth";
import { filterReducer } from "./reducer_filter";

export const reducer = combineReducers({ typesReducer, productsReducer, authReducer, filterReducer })
