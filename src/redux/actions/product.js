import Axios from "axios";

export const getProduct = () => {
	return {
		type: "GET_PRODUCT",
		payload: Axios.get("http://192.168.1.25:6600/api/product"),
	};
};
