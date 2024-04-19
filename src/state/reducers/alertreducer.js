import { IS_ALERT } from "../Action-creator";
const initialState = {
  boolValue: false,
  text: "",
  color: "",
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_ALERT:
      return {
        ...state,
        boolValue: action.payload.boolValue,
        text: action.payload.text,
        color: action.payload.color,
      };
    default:
      return state;
  }
};

export default alertReducer;
