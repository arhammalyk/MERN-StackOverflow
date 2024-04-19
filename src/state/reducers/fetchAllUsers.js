const fetchUsersReducer = (state = {users: [] }, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
export default fetchUsersReducer;
