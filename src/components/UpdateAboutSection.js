import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInformation } from "../state/Action-creator";
import { addAboutSection } from "../state/Action-creator";
const UpdateAboutSection = () => {
  const [showAboutInput, setshowAboutInput] = useState(false);

  const user = useSelector((state) => state.mydetails.user);
  const dispatch = useDispatch();
  const [about, setAbout] = useState({
    about: "",
  });
  const handleShowAbout = () => {
    setshowAboutInput(true);
  };
  const handleCancel = () => {
    setshowAboutInput(false);
  };
  const onChange = (e) => {
    setAbout({
      ...about,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddAbout = async (e) => {
    e.preventDefault();
    dispatch(addAboutSection(about, fetchUserInformation, setshowAboutInput));
  };
  return (
    <>
      <div className="md:pr-24 md:w-1/2 md:justify-center w-10/12 m-auto mt-6">
        <h1 className="text-[#4c5d6f] text-2xl">About</h1>
        <div className="bg-gray-100 border border-gray-300 rounded w-fit p-8">
          <div>
            {user.user?.about === "null" ? (
              <p className="text-gray-600">
                Your about me section is currently blank. Would you like to add
                one?{" "}
                <span
                  onClick={handleShowAbout}
                  className="cursor-pointer text-blue-600 hover:text-blue-500"
                >
                  Edit profile
                </span>
              </p>
            ) : (
              <p className="text-gray-600 ">
                {user.user?.about}
                <span
                  onClick={handleShowAbout}
                  className="mx-6 cursor-pointer text-blue-600 hover:text-blue-500"
                >
                  Edit profile
                </span>
              </p>
            )}
          </div>
          {showAboutInput && (
            <div>
              <textarea
                onChange={onChange}
                value={about.about}
                rows={4}
                id="about"
                name="about"
                type="text"
                required
                placeholder="About me"
                className="pl-1 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
              />
              <div className="flex">
                <div className="mr-2">
                  <button
                    onClick={handleAddAbout}
                    disabled={about.about.length < 1}
                    className="active:bg-blue-500 hover:bg-blue-600 bg-blue-500  rounded mt-3 text-white p-2 text-sm"
                  >
                    Save profile
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleCancel}
                    className="hover:bg-blue-100 cursor-pointer  rounded mt-3 text-blue-600 p-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateAboutSection;
