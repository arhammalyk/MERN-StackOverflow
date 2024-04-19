import React, { useState } from "react";
import img1 from "../Images/Landingpage/section4/section4i1.png";
import img2 from "../Images/Landingpage/section4/section4i2.png";
import img3 from "../Images/Landingpage/section4/section4i3.png";
import img4 from "../Images/Landingpage/section4/section4i4.png";
import img5 from "../Images/Landingpage/section4/section4i5.png";
import img6 from "../Images/Landingpage/section4/section4i6.png";

const LandingpageWindows = () => {
  const [card1, setcard1] = useState(false);
  const [card2, setcard2] = useState(false);
  const [card3, setcard3] = useState(false);
  const [card4, setcard4] = useState(false);
  const [card5, setcard5] = useState(false);
  const [card6, setcard6] = useState(false);
  const handlemouseenter1 = () => {
    setcard1(true);
  };
  const handlemouseleave1 = () => {
    setcard1(false);
  };
  const handlemouseenter2 = () => {
    setcard2(true);
  };
  const handlemouseleave2 = () => {
    setcard2(false);
  };
  const handlemouseenter3 = () => {
    setcard3(true);
  };
  const handlemouseleave3 = () => {
    setcard3(false);
  };
  const handlemouseenter4 = () => {
    setcard4(true);
  };
  const handlemouseleave4 = () => {
    setcard4(false);
  };
  const handlemouseenter5 = () => {
    setcard5(true);
  };
  const handlemouseleave5 = () => {
    setcard5(false);
  };
  const handlemouseenter6 = () => {
    setcard6(true);
  };
  const handlemouseleave6 = () => {
    setcard6(false);
  };
  return (
    <div className=" bg-[#4c5d6f]">
      <h1 className="p-5 text-xl text-white">Capture what’s on your mind</h1>
      <div className="py-12 md:flex">
        <div className="p-5 left md:w-1/2">
          <h1 className="text-3xl font-semibold text-white">
            Some of our features
          </h1>
        </div>
        <div className="p-5 right md:w-1/2">
          <h1 className="text-gray-400">When and where you need it</h1>
        </div>
      </div>

      {/* cards */}
      <div className="pb-20 mx-3">
        <div className="md:flex">
          <div
            onMouseEnter={handlemouseenter1}
            onMouseLeave={handlemouseleave1}
            className="md:relative pl-5 md:w-1/2  my-1 md:mx-2  bg-[#0a9af4]  w-full  h-72"
          >
            <img
              className={`${
                card1 ? " scale-x-110  scale-y-110" : ""
              }  transform  origin-center  transition-all  duration-500 md:absolute sm:bottom-0 md:right-2 md:top-6`}
              src={img1}
              alt=""
            />
            <h1 className="md:absolute md:bottom-28  text-white  font-bold  text-2xl">
              Find what you need, fast
            </h1>
            <p className="md:absolute md:bottom-16  text-white  text-sm">
              Quickly filter and search for notes
            </p>
          </div>
          <div className="md:w-1/2 md:flex">
            <div
              onMouseEnter={handlemouseenter2}
              onMouseLeave={handlemouseleave2}
              className="relative pl-5 md:w-1/2 my-1 bg-[#000000]  w-full  h-72"
            >
              <img
                className={`${
                  card2 ? " scale-x-110  scale-y-110" : ""
                }  p-5  transform  origin-center  transition-all  duration-500`}
                src={img2}
                alt=""
              />
              <h1 className=" absolute  bottom-28  text-white  font-bold  text-2xl">
                Mosaic.io
              </h1>
              <p className="absolute bottom-12 text-white text-sm">
                Find what you're looking for
              </p>
            </div>
            <div
              onMouseEnter={handlemouseenter3}
              onMouseLeave={handlemouseleave3}
              className="relative pl-5 md:mx-2 md:w-1/2 my-1 bg-gradient-to-r  from-[#a33e8f]  to-[#e46a1e]  w-full  h-72"
            >
              <img
                className={` ${
                  card3 ? " scale-x-110  scale-y-110" : ""
                }  p-5  transform  origin-center  transition-all  duration-500`}
                src={img3}
                alt=""
              />
              <h1 className="md:absolute md:bottom-28  text-white  font-bold  text-xl">
                Scholar Raise
              </h1>
              <p className="md:absolute md:bottom-16  text-white  text-sm">
                let Keep do the remembering for you.
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex">
          <div className="md:w-1/2 md:flex">
            <div
              onMouseEnter={handlemouseenter4}
              onMouseLeave={handlemouseleave4}
              className=" relative pl-5 md:mx-2 md:w-1/2  my-1  bg-[#ffffff]  w-full  h-72"
            >
              <img
                className={` ${
                  card4 ? " scale-x-110  scale-y-110" : ""
                }  p-5  transform  origin-center  transition-all  duration-500`}
                src={img4}
                alt=""
              />
              <h1 className="md:absolute md:bottom-28  text-[#10375c]  font-bold  text-xl">
                <span className=" font-extrabold">My</span>Houseby
              </h1>
              <p className="md:absolute md:bottom-16  text-[#10375c]  text-sm">
                Keep works on your phone, tablet and computer
              </p>
            </div>
            <div
              onMouseEnter={handlemouseenter5}
              onMouseLeave={handlemouseleave5}
              className=" relative pl-5 md:w-1/2  my-1  bg-gradient-to-r  from-[#a33e8f]  to-[#e46a1e]  w-full  h-72"
            >
              <img
                className={` ${
                  card5 ? " scale-x-110  scale-y-110" : ""
                }  p-5  transform  origin-center  transition-all  duration-500`}
                src={img5}
                alt=""
              />
              <h1 className="md:absolute md:bottom-28  text-white  font-bold  text-xl">
                Shopbop
              </h1>
              <p className="md:absolute md:bottom-16  text-white  text-sm">
                Keep every thought
              </p>
            </div>
          </div>
          <div
            onMouseEnter={handlemouseenter6}
            onMouseLeave={handlemouseleave6}
            className=" relative pl-5 md:mx-2 md:w-1/2  my-1  bg-gradient-to-r  from-[#113664]  to-[#647bcb]  w-full  h-72"
          >
            <img
              className={` ${
                card6 ? " scale-x-110  scale-y-110" : ""
              } md:absolute md:right-0 md:top-6  transform  origin-center  transition-all  duration-500`}
              src={img6}
              alt=""
            />
            <h1 className="md:absolute md:bottom-20 text-white font-bold text-xl">
              GreenPal
            </h1>
            <p className="md:absolute md:bottom-8 text-white text-sm">
              Get next day lawn care and Simplify Your Life. GreenPal is an
              online freelancing platform that connects landscapers to clients
              in the United States.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingpageWindows;
