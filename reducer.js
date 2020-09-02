export const initialState = {
    userPic: "",
    search: "",
    userDoc: "",
};

const reducer = (state, action) => {
    switch(action.type) {
        case "set_pic":
			return {
				...state,
				userPic: action.userPic,
            };
            
		case "set_doc":
			return {
				...state,
				userDoc: action.userDoc,
            }
            
		case "set_search":
			return {
				...state,
				search: action.search_value,
            };
            
		default:
			return state;
	}
};

export default reducer;