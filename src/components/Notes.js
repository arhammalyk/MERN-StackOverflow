import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Editnote from "./Editnote";
import { loadingBar } from "../state/Action-creator";
import { isAlert } from "../state/Action-creator";
import { deleteNote } from "../state/Action-creator";
import { fetchNote } from "../state/Action-creator";
import { addNote } from "../state/Action-creator";

const Notes = () => {
  document.title = "Notes - Arham Stack";
  document.body.style.backgroundColor = "#f1f1f1";
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const [showDiv, setShowDiv] = useState(false);
  const [open, setOpen] = useState(false);
  const [note, setnote] = useState({
    title: "",
    description: "",
  });
  const handleMouseOver = () => {
    setShowDiv(true);
  };
  const handleMouseLeave = () => {
    setShowDiv(false);
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(addNote(note, loadingBar, isAlert));
  };

  const fetchallnotes = async () => {
    dispatch(fetchNote());
  };

  const deleteButton = async (e, id) => {
    e.preventDefault();
    dispatch(deleteNote(id));
  };
  const editButton = () => {
    // e.preventDefault();
    setOpen(true);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchallnotes();
    } else {
      navigator("/signin");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="my-20">
        <div className="bg-white w-1/2 m-auto py-8 shadow-xl rounded-2xl">
          <form
            onSubmit={handlesubmit}
            className="space-y-6 w-10/12 m-auto"
            action="#"
            method="POST"
          >
            <div>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  value={note.title}
                  placeholder="title"
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  required
                  className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm border-gray-300 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  value={note.description}
                  placeholder="Take a note..."
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  required
                  className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <button type="submit">
                <FontAwesomeIcon
                  icon={faThumbTack}
                  className="hover:text-red-400 text-red-500 mr-2 cursor-pointer active:text-black"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className=" mx-auto p-5 px-20">
          {notes.notes.notes?.length === 0 ? (
            <h1 className="text-center text-2xl text-gray-600">
              Notes you add appear here
            </h1>
          ) : (
            <h1 className="font-thin text-sm text-gray-800 mb-3">PINNED</h1>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notes.notes.notes?.map((item, index) => (
              <div
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                key={index}
                className="rounded-lg bg-white p-6 shadow-md h-36"
              >
                <div onClick={(e) => editButton(e, item._id)}>
                  <h2 className="text-xl font-thin text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 font-semibold mt-2">
                    {item.description}
                  </p>
                </div>
                {showDiv && (
                  <div className="mt-5">
                    <button>
                      <FontAwesomeIcon
                        onClick={(e) => deleteButton(e, item._id)}
                        icon={faRemove}
                        className="hover:text-red-400 text-red-500 mr-2 cursor-pointer"
                      />
                    </button>
                  </div>
                )}
                <Editnote open={open} setOpen={setOpen} id={item._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
