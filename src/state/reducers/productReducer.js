import { FETCH_PRODUCT_SUCCESS } from "../Action-creator";
export const getProductsDetailsReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
