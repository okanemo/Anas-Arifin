const initialValue = {
	user: null,
	userList: [],
};

const user = (state = initialValue, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "GET_USER_LIST":
			return {
				...state,
				userList: action.payload,
			};
		default:
			return state;
	}
};

export default user;
