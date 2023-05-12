import { combineReducers } from "redux";
import { productsReducer } from "./reducer_products";
import { typesReducer } from "./reducer_types";
import { productForReducer } from "./reducer_productFor";

export const reducer = combineReducers({ productForReducer, typesReducer, productsReducer })
