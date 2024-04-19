
const defaultQuestion = {
  title: "Default Question",
  description: "This is the default question.",
};
const fetchQuestionsReducer = (state = { questions: [defaultQuestion] }, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS_SUCCESS":
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
};
export default fetchQuestionsReducer;
