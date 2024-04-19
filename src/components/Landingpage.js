import React, { useState } from "react";
import LandingpageWindows from "./LandingpageWindows";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { loadingBar } from "../state/Action-creator";
import "../SlidingCarousal.css";
import img2 from "../Images/Landingpage/carousal2.jpg";
import img3 from "../Images/Landingpage/keepeverythought.jpg";
import keep from "../Images/Landingpage/kelly-sikkema-jr61kHaWKek-unsplash.jpg";
import { useNavigate } from "react-router-dom";
const Landingpage = () => {
  document.title = "Home - Arham Stack";
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    img2,
    img3,
    img2,
    // Add more image URLs as needed
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  document.body.style.backgroundColor = "#f1f1f1";
  return (
    <>
      <div className="sliding-carousel">
        <div className="carousel-container mt-16">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              }`}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              <img
                className="md:h-2/3 w-full relative"
                src={image}
                alt={` ${index + 1}`}
              />
              <div className="carousal-caption absolute top-4 left-2 sm:top-10 sm:left-10 md:top-32 md:left-6">
                <h1 className="sm:text-xl md:text-4xl text-black font-thin">
                  Save your thoughts, wherever you are
                </h1>
                <button
                  onClick={() => {
                    dispatch(loadingBar(100));
                    setTimeout(() => {
                      dispatch(loadingBar(0));
                    }, 1000);
                    navigator("/signup");
                  }}
                  className="hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]"
                >
                  Join the community
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className=" prev-button" onClick={prevSlide}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="next-button" onClick={nextSlide}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div className="bg-[#4c5d6f] rounded h-fit w-11/12 md:mt-20 m-auto">
        <div className="md:flex">
          <div className="flex md:w-1/2 justify-center">
            <div className="text-[#4c5d6f] bg-[#ffe4cc] w-11/12 mt-8 rounded p-20 text-center transform origin-center transition-all duration-500 hover:scale-x-105 hover:scale-y-105">
              <p>Want a secure, private space for your technical knowledge?</p>
              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    dispatch(loadingBar(100));
                    setTimeout(() => {
                      dispatch(loadingBar(0));
                    }, 1000);
                    navigator("/notes");
                  } else {
                    dispatch(loadingBar(100));
                    setTimeout(() => {
                      dispatch(loadingBar(0));
                    }, 1000);
                    navigator("/signup");
                  }
                }}
                className="hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]"
              >
                Make your notes
              </button>
              <p className="text-sm mt-2">
                or{" "}
                <span
                  onClick={() => {
                    dispatch(loadingBar(100));
                    setTimeout(() => {
                      dispatch(loadingBar(0));
                    }, 1000);
                    navigator("/signup");
                  }}
                  className="underline cursor-pointer"
                >
                  {" "}
                  signup
                </span>
              </p>
            </div>
          </div>
          <div className="flex md:w-1/2 justify-center">
            <div className="text-[#4c5d6f] bg-[#d0ecfc] w-11/12 mt-8 rounded p-20 text-center transform origin-center transition-all duration-500 hover:scale-x-105 hover:scale-y-105">
              <p>
                Find the best answer to your technical question, help others
                answer theirs
              </p>
              <button
                onClick={() => {
                  dispatch(loadingBar(100));
                  setTimeout(() => {
                    dispatch(loadingBar(0));
                  }, 1000);
                  navigator("/questions");
                }}
                className="hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]"
              >
                Discover
              </button>
              <p className="text-sm mt-2">
                or{" "}
                <span
                  onClick={() => {
                    dispatch(loadingBar(100));
                    setTimeout(() => {
                      dispatch(loadingBar(0));
                    }, 1000);
                    navigator("/users");
                  }}
                  className="underline cursor-pointer"
                >
                  {" "}
                  view users
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="my-16">
          <p className=" text-center text-4xl text-white">
            Every developer has a tab open to Arham Stack
          </p>
        </div>

        <div className="md:flex text-center bg-[#4c5d6f] pb-14">
          <div className="my-2 text-white w-10/12 m-auto px-8">
            <p>Expert Q&As</p>
            <p className="text-gray-300">
              Access expert solutions designed for your best study. Learn by
              seeing each clear & concise solutions.
            </p>
          </div>
          <div className="my-2 text-white w-10/12 m-auto px-8">
            <p>5,000+</p>
            <p className="text-gray-300">
              Arham Stack for Teams instances active every day
            </p>
          </div>
          <div className="my-2 text-white w-10/12 m-auto px-8">
            <p>45.1+ billion</p>
            <p className="text-gray-300">
              Times a developer got help since 2008
            </p>
          </div>
          <div className="my-2 text-white w-10/12 m-auto px-8">
            <p>100+ million</p>
            <p className="text-gray-300">
              monthly visitors to Stack Overflow & Stack Exchange
            </p>
          </div>
        </div>
      </div>

      {/* <div className="md:flex">
        <div className="md:w-1/3 text-center w-10/12 m-auto">
          <p>
            A public platform building the definitive collection of coding
            questions & answers
          </p>
          <p>
            A public platform building the definitive collection of coding
            questions & answers
          </p>
          <button>join</button>
        </div>
        <div className="md:w-1/3 text-center w-10/12 m-auto">
          <p>
            A public platform building the definitive collection of coding
            questions & answers
          </p>
          <p>
            A public platform building the definitive collection of coding
            questions & answers
          </p>
          <button>join</button>
        </div>
      </div> */}
      <div>
        <p className="text-4xl text-center px-20 my-20 font-thin text-[#4c5d6f]">
          94% of Arham Stack customers say they get better grades when they use
          Arham Stack to understand their coursework
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          <img src={keep} alt="" className="w-full h-auto object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white text-4xl font-thin mb-4">
              Keep every thought
            </p>
            <button
              onClick={() => {
                // eslint-disable-next-line
                {
                  if (localStorage.getItem("token")) {
                    dispatch(loadingBar(100));
                    setTimeout(() => {
                      dispatch(loadingBar(0));
                    }, 1000);
                    navigator("/notes");
                  } else {
                    dispatch(loadingBar(100));
                    setTimeout(() => {
                      dispatch(loadingBar(0));
                    }, 1000);
                    navigator("/signup");
                  }
                }
              }}
              className="bg-blue-500 hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-500 mt-3 rounded px-8 py-2 text-white border border-[#4c5d6f]"
            >
              Make notes
            </button>
          </div>
        </div>
      </div>

      <LandingpageWindows />
      <div className="my-20">
        <div>
          <h1 className="text-center text-[#4c5d6f] text-2xl      ">
            Build a private community to share technical or non-technical
            knowledge.
          </h1>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              dispatch(loadingBar(100));
              setTimeout(() => {
                dispatch(loadingBar(0));
              }, 1000);
              navigator("/signup");
            }}
            className="hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]"
          >
            Create an account
          </button>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
