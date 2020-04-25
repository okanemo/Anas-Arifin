const initialValue = {
	editProduct: false,
};

const modal = (state = initialValue, action) => {
	switch (action.type) {
		case "EDIT_PRODUCT":
			return {
				...state,
				editProduct: action.payload,
			};
		default:
			return state;
	}
};

export default modal;
