import { LOADING_BAR } from "../Action-creator";
const initialState = {
  value: 0
};

const loadingbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_BAR:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

export default loadingbarReducer;
