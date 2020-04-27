import Axios from "axios";

export const getProduct = () => {
	return {
		type: "GET_PRODUCT",
		payload: Axios.get("http://100.24.32.116:6600/api/product"),
	};
};
