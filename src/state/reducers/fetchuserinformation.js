const initialState = {
  user: {},
  loading: false,
  error: null,
};

const fetchuserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        user: {},
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default fetchuserReducer;