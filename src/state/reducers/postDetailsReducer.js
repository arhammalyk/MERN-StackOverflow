const initialState = {
  post: {},
};

const postDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST-DETAILS":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
export default postDetailsReducer;
