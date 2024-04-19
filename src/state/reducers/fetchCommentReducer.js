const fetchCommentReducer = (state = { comment: [] }, action) => {
  switch (action.type) {
    case "FETCH_COMMENT_SUCCESS":
      return {
        ...state,
        comment: action.payload,
      };
    default:
      return state;
  }
};
export default fetchCommentReducer;
