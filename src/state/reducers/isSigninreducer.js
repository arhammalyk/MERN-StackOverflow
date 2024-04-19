// Initial state
const initialState = false;

// Reducer function
const issigninreducer = (state = initialState, action) => {
  if(action.type==='issignin')
  {
      state=action.payload
      return state
  }
  else{
      return state;
  }
};
export default issigninreducer
