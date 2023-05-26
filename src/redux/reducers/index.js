import { combineReducers } from "redux";
import { typesReducer } from "./reducer_types";
import { productsReducer } from "./reducer_products";
import { usersReducer } from "./reducer_users";
import { filterReducer } from "./reducer_filter";

export const reducer = combineReducers({ typesReducer, productsReducer, usersReducer, filterReducer })
