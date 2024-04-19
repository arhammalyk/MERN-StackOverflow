
const defaultQuestion = {
  title: "Default Question",
  description: "This is the default question.",
};
const fetchUserQuestionsReducer = (state = { questions: [defaultQuestion] }, action) => {
  switch (action.type) {
    case "FETCH_USER_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
};
export default fetchUserQuestionsReducer;
