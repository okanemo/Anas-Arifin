const initialValue = {
	products: [],
	ready: false,
};

const product = (state = initialValue, action) => {
	switch (action.type) {
		case "GET_PRODUCT_PENDING":
			return state;
		case "GET_PRODUCT_REJECTED":
			return {
				...state,
				ready: true,
			};
		case "GET_PRODUCT_FULFILLED":
			return {
				...state,
				ready: true,
				products: action.payload.data,
			};
		default:
			return state;
	}
};

export default product;
