import { combineReducers } from "redux";
import { productForReducer } from "./productFor_reducer";
import { typesReducer } from "./reducer_types";

export const reducer = combineReducers({ productForReducer, typesReducer })
