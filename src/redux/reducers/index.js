import { combineReducers } from "redux";
import { productReducer } from "./reducer_product";
import { typesReducer } from "./reducer_types";

export const reducer = combineReducers({ productReducer, typesReducer })
