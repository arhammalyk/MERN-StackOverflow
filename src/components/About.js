import React from "react";
import woodenbg from "../Images/Landingpage/about/ekaterina-novitskaya-KugwNl9jX1Q-unsplash.jpg";
import phone from "../Images/Landingpage/about/mobile.jpg";
import { useDispatch } from "react-redux";
import { loadingBar } from "../state/Action-creator";
import { useNavigate } from "react-router-dom";
const About = () => {
  document.title = "About - Arham Stack";
  const dispatch = useDispatch();
  const navigator = useNavigate();
  return (
    <>
      <div className="mt-16"></div>
      <div>
        <img className="-z-50 fixed top-0" src={woodenbg} alt="" />
      </div>
      <div className="md:p-44 p-8">
        <h1 className="text-white text-xl md:text-5xl font-thin">Save your thoughts, </h1>

        <h1 className="text-white text-xl md:text-5xl font-thin mt-3">
          {" "}
          wherever you are{" "}
        </h1>
        <button
          onClick={() => {
            dispatch(loadingBar(100));
            setTimeout(() => {
              dispatch(loadingBar(0));
            }, 1000);
            navigator("/notes");
          }}
          className="hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-500 mt-3 rounded px-8 py-2 text-white border border-white"
        >
          Try Stack notes
        </button>
      </div>
      <div className="z-50 bg-white">
        <div className="text-center">
          <h1 className="pt-16 text-4xl text-gray-400 font-thin">
            Capture what’s on your mind
          </h1>
          <p className="pb-16 text-gray-600 mt-6">
            Add notes, lists, photos, and audio to Keep.
          </p>
        </div>
        <div className="p-4 md:flex">
          <div className="md:w-1/2 md:pl-52 mt-16">
            <h1 className="text-2xl mb-4 text-gray-500">
              When and where you need it
            </h1>
            <p className="text-gray-700">
              Need to remember to pick up some groceries? Set a location-based
              reminder to pull up your grocery list right when you get to the
              store. Need to finish a to-do? Set a time-based reminder to make
              sure you never miss a thing.
            </p>
          </div>
          <div className="md:w-1/2 md:px-24">
            <div className="flex justify-center items-center">
              <img src={phone} alt="" className="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
