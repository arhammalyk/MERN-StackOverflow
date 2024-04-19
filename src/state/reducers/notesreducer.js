import { FETCH_ALL_NOTES } from '../Action-creator';

const initialState = {
  notes: []
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    default:
      return state;
  }
};

export default notesReducer;
