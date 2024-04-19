import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  answerVoteDown,
  deleteComment,
  deleteQuestion,
  fetchUserInformation,
  fetchUserQuestions,
  loadingBar,
} from "../state/Action-creator";
import { isAlert } from "../state/Action-creator";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionComments } from "../state/Action-creator";
import { addComment } from "../state/Action-creator";
import { fetchQuestionDetails } from "../state/Action-creator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { questionVoteUp } from "../state/Action-creator";
import { questionVoteDown } from "../state/Action-creator";
import { answerVoteUp } from "../state/Action-creator";
import UpdatePostModal from "./UpdatePostModal";
import EditCommentModal from "./EditCommentModal";
const SpecificQuestion = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigator = useNavigate();
  const { questionId } = location.state;
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const comments = useSelector((state) => state.questionComments);
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.mydetails.user);
  const [answer, setAnswer] = useState({
    answer: "",
  });
  const onChange = (e) => {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value,
    });
  };
  const handleAnswer = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      dispatch(isAlert(true, "Must signin first to add comment", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(addComment(questionId, answer, loadingBar, isAlert));
    }
  };
  const fetchQuestion = async () => {
    dispatch(fetchQuestionDetails(questionId));
  };
  const handleQuestionVoteUp = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      dispatch(isAlert(true, "Must signin first to add vote", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(questionVoteUp(questionId));
    }
  };
  const handleQuestionVoteDown = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      dispatch(isAlert(true, "Must signin first to add vote", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(questionVoteDown(questionId));
    }
  };
  const handleAnswerVoteUp = (e, id) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      dispatch(isAlert(true, "Must signin first to add vote", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(answerVoteUp(id, questionId));
    }
  };
  const handleAnswerVoteDown = (e, id) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      dispatch(isAlert(true, "Must signin first to add vote", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(answerVoteDown(id, questionId));
    }
  };
  const handleEdit = () => {
    if (user.user?._id !== post.user?.question?.user) {
      dispatch(isAlert(true, "You can only edit those you own", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      setOpen(true);
    }
  };
  const handleDelete = () => {
    if (user.user?._id !== post.user?.question?.user) {
      dispatch(isAlert(true, "You can only delete those you own", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(
        deleteQuestion(
          questionId,
          fetchUserQuestions,
          loadingBar,
          isAlert,
          navigator
        )
      );
    }
  };
  const handleEditComment = (id) => {
    if (user.user?._id !== id) {
      dispatch(isAlert(true, "You can only edit those you own", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      setOpenEdit(true);
    }
  };
  const handleDeleteComment = (commentUser, commentId) => {
    if (user.user?._id !== commentUser) {
      dispatch(isAlert(true, "You can only delete those you own", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(
        deleteComment(
          commentId,
          questionId,
          fetchQuestionComments,
          loadingBar,
          isAlert,
          navigator
        )
      );
    }
  };

  let secondsSinceCreation;
  let minutesSinceCreation;
  let hoursSinceCreation;
  let daysSinceCreation;
  const timeSince = () => {
    // Get the current date
    const currentDate = new Date();

    // Get the user's creation date
    const userCreationDate = new Date(post.user?.question?.date);

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate - userCreationDate;

    // Calculate the number of seconds, minutes, and hours
    secondsSinceCreation = Math.floor(timeDiff / 1000);
    minutesSinceCreation = Math.floor(timeDiff / (1000 * 60));
    hoursSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60));
    daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };
  timeSince();

  useEffect(() => {
    dispatch(fetchUserInformation());
    fetchQuestion();
    dispatch(fetchQuestionComments(questionId));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="py-5 px-12 mt-20">
        <h1 className="text-[#4c5d6f] text-3xl ">
          {post.user?.question?.title}
        </h1>
        <div className="text-sm mt-4">
          <span className="text-gray-600">Asked</span>{" "}
          {new Date(post.user?.question?.date).toLocaleDateString()}
        </div>
      </div>
      <hr className="w-full h-0.5 bg-gray-300" />
      <div className="py-5 px-12 md:flex">
        <div className="md:w-4/6">
          <div className="flex">
            <div className="w-1/12 mt-2 pr-5 px-3">
              <button>
                <FontAwesomeIcon
                  onClick={(e) => handleQuestionVoteUp(e)}
                  icon={faSortUp}
                  className="hover:text-black text-gray-500 text-2xl cursor-pointer"
                />
              </button>
              <p>{post.user?.question?.votes}</p>
              <button>
                <FontAwesomeIcon
                  onClick={(e) => handleQuestionVoteDown(e)}
                  icon={faSortDown}
                  className="hover:text-black text-gray-500 text-2xl cursor-pointer"
                />
              </button>
            </div>
            <div className="w-full">
              <p className="text-sm text-blue-500 font-bold">
                @{post.user?.question?.name}
              </p>
              <p className="text-gray-700 text-lg">
                {/* {post.user?.question?.description} */}
                {post.user?.question?.description
                  .split("\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </p>
              <div className="w-full mt-16">
                <div className="text-end">
                  <span className="text-sm text-gray-600 rounded bg-blue-100 p-4">
                    {secondsSinceCreation < 60 && (
                      <span>asked {secondsSinceCreation} seconds ago</span>
                    )}
                    {minutesSinceCreation < 60 && minutesSinceCreation > 1 && (
                      <span>asked {minutesSinceCreation} minutes ago</span>
                    )}
                    {hoursSinceCreation < 24 && hoursSinceCreation > 1 && (
                      <span>asked {hoursSinceCreation} hours ago</span>
                    )}
                    {daysSinceCreation > 1 && (
                      <span>asked {daysSinceCreation} days ago</span>
                    )}{" "}
                    <span className="text-black">
                      by{" "}
                      <span className="text-blue-600 hover:text-blue-400 cursor-pointer ">
                        {post.user?.question?.name}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex">
                <div>
                  <button
                    onClick={handleEdit}
                    className="mr-2 text-sm mt-6 text-gray-500 hover:text-gray-400"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleDelete}
                    className="text-sm mt-6 text-gray-500 hover:text-gray-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-xl mt-10">{comments.comments.length} Answers</h1>
          <div>
            <div>
              {comments.comments.map((item, index) => (
                <div key={index}>
                  <div className="py-5">
                    <div className="flex">
                      <div className="w-1/12 mt-2 pr-5 px-3">
                        <button>
                          <FontAwesomeIcon
                            onClick={(e) => handleAnswerVoteUp(e, item._id)}
                            icon={faSortUp}
                            className="hover:text-black text-gray-500 text-2xl cursor-pointer"
                          />
                        </button>
                        <p>{item.votes}</p>
                        <button>
                          <FontAwesomeIcon
                            onClick={(e) => handleAnswerVoteDown(e, item._id)}
                            icon={faSortDown}
                            className="hover:text-black text-gray-500 text-2xl cursor-pointer"
                          />
                        </button>
                      </div>
                      <div>
                        <p className="text-sm text-blue-500 font-bold">
                          @{item.name}
                        </p>
                        {/* <h1 className="text-lg">{item.comment}</h1> */}
                        {item.comment.split("\n").map((paragraph, index) => (
                          <p className="text-lg" key={index}>
                            {paragraph}
                          </p>
                        ))}
                        <div className="">
                          <button
                            onClick={() => handleEditComment(item.user)}
                            className="mr-2 text-sm mt-6 text-gray-500 hover:text-gray-400"
                          >
                            Edit
                          </button>
                          <EditCommentModal
                            openEdit={openEdit}
                            setOpenEdit={setOpenEdit}
                            commentId={item._id}
                            questionId={questionId}
                          />
                          <button
                            onClick={() =>
                              handleDeleteComment(item.user, item._id)
                            }
                            className="text-sm mt-6 text-gray-500 hover:text-gray-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="md:mr-20">
                      <h1 className="text-end text-gray-500 text-sm">
                        Answered {new Date(item.date).toLocaleDateString()}
                      </h1>
                    </div>
                  </div>
                  <hr className="w-full h-0.5 bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="mt-6 text-xl text-[#4c5d6f]">Your Answer</h1>
            <p className="text-gray-600 mt-2 text-sm">Minimum 10 characters.</p>
            <textarea
              onChange={onChange}
              value={answer.answer}
              rows="8"
              id="answer"
              name="answer"
              type="text"
              required
              className="pl-1 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
            />
            <div className="border border-yellow-200 rounded bg-yellow-50 mt-3 text-gray-700 text-sm p-5">
              <p>Thanks for contributing an answer to Arham Stack!</p>
              <p className="my-3 ml-6">
                Please be sure to answer the question. Provide details and share
                your research!
              </p>
              <p>But avoid …</p>
              <div className="my-3 ml-6">
                <p>
                  Asking for help, clarification, or responding to other
                  answers.
                </p>
                <p>
                  Making statements based on opinion; back them up with
                  references or personal experience.
                </p>
              </div>
              <p>To learn more, see our tips on writing great answers.</p>
            </div>
            <button
              onClick={handleAnswer}
              disabled={answer.answer.length < 10}
              className={`${
                answer.answer.length < 10
                  ? "bg-blue-400"
                  : "bg-blue-500 hover:bg-blue-600"
              } cursor-pointer  rounded mt-3 text-white p-2 text-sm`}
            >
              Post Your Answer
            </button>
          </div>
        </div>
        <div className="md:w-4/12 px-4 mt-4">
          <div className="rounded border border-yellow-100">
            <p className="bg-yellow-100 text-sm font-semibold p-2 text-gray-700">
              The Overflow Blog
            </p>
            <hr className="w-full h-0.5 bg-gray-300" />
            <div className="bg-yellow-50 p-2 text-sm text-gray-700">
              <p className="mb-3">
                Chatting with Apple at WWDC: Macros in Swift and the new
                visionOS (Ep. 578)
              </p>
              <p>The meeting that changed how we build software (Ep. 579)</p>
            </div>
            <hr className="w-full h-0.5 bg-gray-300" />
            <p className="bg-yellow-100 text-sm font-semibold p-2 text-gray-700">
              Featured on Meta
            </p>
            <hr className="w-full h-0.5 bg-gray-300" />
            <div className="bg-yellow-50 p-2 text-sm text-gray-700">
              <p className="mb-3">
                We are graduating the updated button styling for vote arrows
              </p>
              <p>Temporary policy: ChatGPT is banned</p>
            </div>
          </div>
        </div>
      </div>
      <UpdatePostModal open={open} setOpen={setOpen} questionId={questionId} />
    </>
  );
};

export default SpecificQuestion;
