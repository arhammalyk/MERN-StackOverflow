import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { updateNote } from "../state/Action-creator";
import { useDispatch } from "react-redux";
export default function Editnote(props) {
  const [note, setnote] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const onChange = (e) => {
    setnote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(updateNote(props.id, note));
  };
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="mt-2">
                        <div className="w-10/12">
                          <div className="mt-2">
                            <input
                              onChange={onChange}
                              value={setnote.title}
                              id="title"
                              name="title"
                              type="text"
                              autoComplete="text"
                              placeholder="Title"
                              required
                              className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:text-lg sm:text-sm border-gray-300 focus:outline-none"
                            />
                          </div>
                          <div className="mt-2">
                            <input
                              onChange={onChange}
                              value={setnote.description}
                              id="description"
                              name="description"
                              type="text"
                              autoComplete="description"
                              placeholder="Description"
                              required
                              className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-lg placeholder:text-gray-400 sm:text-sm border-gray-300 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex justify-between sm:flex-row sm:px-6">
                  <button onClick={handlesubmit}>
                    <FontAwesomeIcon
                      icon={faThumbTack}
                      className="text-red-500 mr-2 cursor-pointer active:text-black"
                    />
                  </button>
                  <button
                    type="button"
                    className=" mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-thin text-black ring-1 ring-inset ring-transparent hover:bg-gray-300 rounded sm:mt-0 sm:w-auto"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    close
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
