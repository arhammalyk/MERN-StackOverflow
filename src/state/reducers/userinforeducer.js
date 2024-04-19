import { GET_USER_DETAILS } from "../Action-creator";
export const getUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};