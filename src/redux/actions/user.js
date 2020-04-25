import Axios from "axios";

export const login = (data) => {
	return {
		type: "LOGIN",
		payload: data,
	};
};
export const getUserList = (data) => {
	return {
		type: "GET_USER_LIST",
		payload: data,
	};
};
