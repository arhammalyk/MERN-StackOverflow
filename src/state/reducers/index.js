import { combineReducers } from "redux";
import amountreducer from "./amountreducer";
import changename from "./changename";
import issigninreducer from "./isSigninreducer";
import notesReducer from "./notesreducer";
import loadingbarReducer from "./loadingbarreducer";
import alertReducer from "./alertreducer";
import { getUserDetailsReducer } from "./userinforeducer";
import fetchuserReducer from "./fetchuserinformation";
import fetchQuestionsReducer from "./fetchQuestionsReducer";
import fetchUserQuestionsReducer from "./fetchUserQuestions";
import fetchCommentsReducer from "./commentsReducer";
import fetchUsersReducer from "./fetchAllUsers";
import postDetailsReducer from "./postDetailsReducer";
import fetchCommentReducer from "./fetchCommentReducer";
import { getProductsDetailsReducer } from "./productReducer";
const reducers = combineReducers({
  amount: amountreducer,
  name: changename,
  isin: issigninreducer,
  user: getUserDetailsReducer,
  users: fetchUsersReducer,
  notes: notesReducer,
  loading: loadingbarReducer,
  alert: alertReducer,
  mydetails: fetchuserReducer,
  allQuestions: fetchQuestionsReducer,
  userQuestions: fetchUserQuestionsReducer,
  questionComments: fetchCommentsReducer,
  post: postDetailsReducer,
  comment: fetchCommentReducer,
  allProducts: getProductsDetailsReducer,
});
export default reducers;
