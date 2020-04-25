import { combineReducers } from "redux";
import user from "./user";
import product from "./product";
import modal from "./modal";

const reducers = combineReducers({
	user,
	product,
	modal,
});

export default reducers;
