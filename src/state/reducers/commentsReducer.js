const fetchCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};
export default fetchCommentsReducer;
