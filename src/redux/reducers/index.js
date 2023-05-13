import { combineReducers } from "redux";
import { productForReducer } from "./reducer_productFor";
import { typesReducer } from "./reducer_types";
import { productsReducer } from "./reducer_products";
import { filterReducer } from "./reducer_filter";

export const reducer = combineReducers({ productForReducer, typesReducer, productsReducer, filterReducer })
