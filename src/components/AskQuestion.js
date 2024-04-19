import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { loadingBar } from "../state/Action-creator";
import { isAlert } from "../state/Action-creator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuestion } from "../state/Action-creator";
const AskQuestion = () => {
  document.title = "Ask a public question - Arham Stack";
  document.body.style.backgroundColor = "#f1f1f1";
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [question, setQuestion] = useState({
    title: "",
    description: "",
  });
  const onChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };
  const handlePost = async (e) => {
    e.preventDefault();
    dispatch(addQuestion(question, navigator, loadingBar, isAlert));
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigator("/signin");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="p-5 mt-24">
        <h1 className="text-3xl font-thin">Ask a public question</h1>
      </div>
      <div className="md:flex">
        <div className="md:w-3/4">
          <div className="p-5">
            <div className="p-6 rounded border border-blue-300 bg-blue-50">
              <h1 className="text-gray-600 text-xl">Writing a good question</h1>
              <p className="text-gray-600 mt-2">
                You’re ready to <span className="text-blue-500">ask</span> a{" "}
                <span className="text-blue-500">
                  programming-related question
                </span>{" "}
                and this form will help guide you through the process. Looking
                to ask a non-programming question? See the topics here to find a
                relevant site.
              </p>
              <p className="mt-3 text-black">Steps</p>
              <ul className="text-sm text-gray-600 pl-4 mt-3">
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>
                  Describe what you tried and what you expected to happen.
                </li>
                <li>
                  Add “tags” which help surface your question to members of the
                  community.
                </li>
                <li>Review your question and post it to the site.</li>
              </ul>
            </div>
          </div>
          <div className="p-5">
            <div className="p-6 rounded border border-gray-300 bg-white">
              <h1 className="text-black text-xl">Title</h1>
              <p className="text-gray-600 mt-2 text-sm">
                Be specific and imagine you’re asking a question to another
                person.
              </p>
              <input
                onChange={onChange}
                value={question.title}
                id="title"
                name="title"
                type="text"
                required
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                className="pl-1 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="p-5">
            <div className="p-6 rounded border border-gray-300 bg-white">
              <h1 className="text-black text-xl">
                What are the details of your problem?
              </h1>
              <p className="text-gray-600 mt-2 text-sm">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </p>
              <textarea
                onChange={onChange}
                value={question.description}
                rows="8"
                id="description"
                name="description"
                type="text"
                required
                placeholder="Description"
                className="pl-1 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
              />
              <button
                onClick={handlePost}
                disabled={question.description.length < 20}
                className={`${
                  question.description.length < 20
                    ? "bg-blue-400"
                    : "bg-blue-500 hover:bg-blue-600"
                } cursor-pointer  rounded mt-3 text-white p-2 text-sm`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 md:w-1/4">
          <div className="shadow-xl p-5 text-gray-600 rounded border border-gray-400 ">
            <h1 className="my-2">
              Make sure we don’t already have an answer for your question
            </h1>
            <div className="flex">
              <div className="w-1/4">
                <FontAwesomeIcon
                  icon={faBell}
                  className="pt-6 text-red-500 text-2xl"
                />
              </div>
              <div className="w-2/3">
                <hr className="w-full h-1 bg-gray-500" />
                <p className="text-sm my-2">
                  Arham Stack is a huge database of knowledge.
                </p>
                <p className="text-sm">
                  Please make sure your question isn’t already answered before
                  posting, or your question might be closed as a duplicate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
