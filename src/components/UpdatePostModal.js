import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { isAlert, loadingBar } from "../state/Action-creator";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { editQuestion } from "../state/Action-creator";
import { useEffect } from "react";
import { fetchQuestionDetails } from "../state/Action-creator";
export default function UpdatePostModal(props) {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const post = useSelector((state) => state.post);
  const [question, setQuestion] = useState({
    title: post.user?.question?.title,
    description: post.user?.question?.description,
  });
  const onChangePost = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(question);
    dispatch(
      editQuestion(props.questionId, question, navigator, loadingBar, isAlert)
    );
  };
  const cancelButtonRef = useRef(null);
  useEffect(() => {
    dispatch(fetchQuestionDetails(props.questionId));
    // eslint-disable-next-line
  }, []);
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-2xl hover:text-red-400 text-red-500 mr-2 cursor-pointer active:text-black"
                    />
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Update post
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 mt-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <textarea
                      onChange={onChangePost}
                      defaultValue={post.user?.question?.title}
                      // value={question.title}
                      id="title"
                      name="title"
                      type="textarea"
                      placeholder="Title"
                      required
                      rows={4}
                      className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="w-full px-4 mt-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>

                  <div className="mt-2">
                    <textarea
                      onChange={onChangePost}
                      defaultValue={post.user?.question?.description}
                      // value={question.description}
                      id="description"
                      name="description"
                      type="textarea"
                      required
                      rows={10}
                      className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-sm"> Minimum 20 characters.</p>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    disabled={
                      question.title?.length < 1 ||
                      question.description?.length < 20
                    }
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handlesubmit}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
