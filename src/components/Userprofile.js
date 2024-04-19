import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInformation } from "../state/Action-creator";
import { fetchUserQuestions } from "../state/Action-creator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRemove,
  faEnvelope,
  faClock,
  faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";
import { isAlert, loadingBar } from "../state/Action-creator";
import { deleteQuestion } from "../state/Action-creator";
import UploadProfileImage from "./UploadProfileImage";
import UpdateAboutSection from "./UpdateAboutSection";
const Userprofile = () => {
  document.title = "Profile - Arham Stack";
  document.body.style.backgroundColor = "#f1f1f1"; 
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.mydetails.user);

  let daysSinceCreation;
  const calculateDaysSinceCreated = () => {
    const currentDate = new Date();
    const userCreationDate = new Date(user.user?.createdAt);

    // Calculate the difference in milliseconds
    const timeDiff = currentDate - userCreationDate;

    // Calculate the difference in days
    daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };
  calculateDaysSinceCreated();
  const userQuestions = useSelector((state) => state.userQuestions);

  const handleDeleteQuestion = async (e, id) => {
    e.preventDefault();
    dispatch(deleteQuestion(id, fetchUserQuestions, loadingBar, isAlert));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUserInformation());
      dispatch(fetchUserQuestions());
    } else {
      navigator("/signin");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="md:flex mt-24 w-full m-auto">
        <div className="md:w-1/4 flex justify-center md:justify-end">
          {user.user?.isVerified && (
            <img
              className="rounded-xl w-40 h-40 bg-gray-200"
              src={user.user?.CoverPhoto?.url}
              alt="user"
            />
          )}
          {!user.user?.isVerified && (
            <div>
              <img
                className="rounded-xl w-40 h-40 bg-gray-200"
                src=""
                alt="user"
              />
            </div>
          )}
        </div>

        <div className="text-center md:text-start md:w-1/2 ml-3 m-auto text-xl text-[#4c5d6f] ">
          <h1 className="text-3xl text-black mb-3">{user.user?.name}</h1>
          <div className="text-sm md:flex">
            <div className="flex">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-lg mr-2 text-gray-500"
              />
              <h1>{user.user?.email}</h1>
            </div>
            <div className="flex">
              <FontAwesomeIcon
                icon={faClock}
                className="text-lg mx-2 text-gray-500 mr-2"
              />
              <h1>
                Joined {new Date(user.user?.createdAt).toLocaleDateString()}
              </h1>
            </div>
            <div className="flex">
              <FontAwesomeIcon
                icon={faCakeCandles}
                className="text-lg mx-2 text-gray-500 mr-2"
              />
              <h1>Member for {daysSinceCreation} days</h1>
            </div>
          </div>
        </div>
      </div>
      <UploadProfileImage />
      <div className="md:flex my-6">
        <div className="md:pl-24 md:w-1/3 w-10/12 m-auto mt-6">
          <h1 className=" text-[#4c5d6f] text-2xl">Stats</h1>
          <div className="border border-gray-300 rounded w-fit p-8">
            <div>
              <div>
                <div className="flex space-x-20">
                  <div>
                    <p>{user.user?.reputation}</p>
                    <p className="text-gray-500">reputation</p>
                  </div>
                  <div>
                    <p>{user.user?.reached}</p>
                    <p className="text-gray-500">reached</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex space-x-20 mt-6">
                  <div>
                    <p>{user.user?.questions}</p>
                    <p className="text-gray-500">questions</p>
                  </div>
                  <div>
                    <p>{user.user?.answers}</p>
                    <p className="text-gray-500">answers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UpdateAboutSection />
      </div>
      <div className="md:w-10/12 px-10 lg:px-36">
        <h1 className=" text-[#4c5d6f] text-2xl mt-14">My posts</h1>
        <div className="rounded border border-gray-300 my-6">
          <div>
            {userQuestions.questions
              .slice()
              .reverse()
              .map((item, index) => (
                <div key={index}>
                  <div className="flex py-1 md:py-5">
                    <div className="w-1/5 md:w-1/5 pl-2 md:pl-12">
                      <span className="p-1 text-sm bg-green-500 rounded text-white">
                        {item.votes} votes
                      </span>
                      <h1 className="text-gray-600">{item.answers} answers</h1>
                      <button>
                        <FontAwesomeIcon
                          onClick={(e) => handleDeleteQuestion(e, item._id)}
                          icon={faRemove}
                          className="hover:text-red-400 active:text-red-600 text-red-500 mr-2 cursor-pointer"
                        />
                      </button>
                    </div>
                    <div className="w-4/5 md:w-4/5 mr-5 md:mr-20">
                      <h1 className="text-lg cursor-pointer text-blue-600 hover:text-blue-500">
                        {item.title}
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
        </div>
      </div>
    </>
  );
};

export default Userprofile;
