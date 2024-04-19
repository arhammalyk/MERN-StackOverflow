import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllQuestions } from "../state/Action-creator";
import { fetchUserInformation } from "../state/Action-creator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faNoteSticky,
  faUsers,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
const Allquestions = () => {
  document.title = "Questions - Arham Stack";
  document.body.style.backgroundColor = "#f1f1f1";
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const questions = useSelector((state) => state.allQuestions);
  const user = useSelector((state) => state.mydetails.user);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    text: "",
    id: "",
    url: "",
  });

  const handleClickTitle = (e, id) => {
    e.preventDefault();
    navigator("/questions/question", { state: { questionId: id } });
  };
  const deleteQuestion = (e, id) => {
    e.preventDefault();
    setModalData({
      title: "Confirm you want to delete this question?",
      text: "This question will be deleted permanentaly",
      id: id,
      url: "deletequestion",
    });
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchAllQuestions());
    if (localStorage.getItem("token")) {
      dispatch(fetchUserInformation());
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="mt-16 md:flex">
        <div className="md:fixed md:w-1/6 bg-[#4c5d6f] h-full p-4 space-y-3 pt-16 text-gray-100">
          <h1
            onClick={() => {
              navigator("/");
            }}
            className="hover:text-black hover:bg-gray-200 rounded p-2 cursor-pointer font-semibold"
          >
            <FontAwesomeIcon icon={faHome} className="mr-1 text-blue-500 " />
            Home
          </h1>
          <h1
            onClick={() => {
              navigator("/notes");
            }}
            className="hover:text-black hover:bg-gray-200 rounded p-2 cursor-pointer font-semibold"
          >
            <FontAwesomeIcon
              icon={faNoteSticky}
              className="mr-1 text-blue-500 "
            />
            My notes
          </h1>
          <h1
            onClick={() => {
              navigator("/users");
            }}
            className="hover:text-black hover:bg-gray-200 rounded p-2 cursor-pointer font-semibold"
          >
            <FontAwesomeIcon icon={faUsers} className="mr-1 text-blue-500 " />
            Users
          </h1>
        </div>

        <div
          // style={{ marginLeft: "calc(10% + 4rem)" }}
          className="px-4 md:w-10/12 md:ml-48"
        >
          <div className="md:flex">
            <div className="">
              <h1 className="p-6 text-3xl">All Questions</h1>
            </div>
            <div>
              <div className="p-6">
                <button
                  onClick={() => {
                    navigator("/questions/ask");
                  }}
                  className="hover:bg-blue-600 active:bg-blue-500 px-3 py-2 bg-blue-500 rounded text-white"
                >
                  Ask Question
                </button>
              </div>
            </div>
          </div>
          <h1 className="p-5 text-gray-700 text-xl">
            {questions.questions.length} questions
          </h1>
          <hr className="w-full h-0.5 bg-gray-300" />
          <div>
            {questions.questions && questions.questions.length > 0 && (
              <div>
                {questions.questions
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <div key={index}>
                      {user.user?.role === "admin" && (
                        <div className="ml-4 flex">
                          <button>
                            <FontAwesomeIcon
                              onClick={(e) => deleteQuestion(e, item._id)}
                              icon={faRemove}
                              className="hover:text-red-400 active:text-red-600 text-red-500 mr-2 cursor-pointer"
                            />
                          </button>
                          <h1 className="text-red-500 text-sm">Delete</h1>
                        </div>
                      )}
                      <div className="flex py-5">
                        <div className="w-1/5 md:pl-12">
                          <h1 className="text-sm">{item.votes} votes</h1>
                          {item.answers === 0 ? (
                            <span className="text-gray-600">
                              {item.answers} answers
                            </span>
                          ) : (
                            <span className="p-0.5 text-sm text-green-800 border border-green-800 rounded">
                              {item.answers} answers
                            </span>
                          )}
                        </div>
                        <div className="w-4/5 md:mr-20">
                          <h1
                            onClick={(e) => handleClickTitle(e, item._id)}
                            className="text-lg cursor-pointer text-blue-600 hover:text-blue-500"
                          >
                            {item.title}
                          </h1>
                          <h1 className="text-gray-700">
                            {item.description.slice(0, 150)} ...
                          </h1>
                          <h1 className="text-end text-gray-500 text-sm">
                            asked {new Date(item.date).toLocaleDateString()}
                          </h1>
                        </div>
                      </div>
                      <hr className="w-full h-0.5 bg-gray-300" />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} modalData={modalData} />
      <ScrollToTopButton />
    </>
  );
};

export default Allquestions;
