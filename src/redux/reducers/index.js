import { combineReducers } from "redux";
import { typesReducer } from "./reducer_types";
import { productsReducer } from "./reducer_products";
import { filterReducer } from "./reducer_filter";

export const reducer = combineReducers({ typesReducer, productsReducer, filterReducer })
