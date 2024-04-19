import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigator = useNavigate();
  return (
    <>
      <div className="bg-[#4c5d6f] py-16">
        <div className="md:flex text-white">
          <div className="w-11/12 m-auto md:w-1/2 md:ml-14">
            <p className="mb-4">How can we help?</p>
            <p>+923201428454</p>
            <p>Call us, it's not free.</p>
          </div>

          <div className="mt-10 w-11/12 m-auto md:flex md:w-1/2 justify-center md:space-x-11">
            <div className="underline ">
              <p
                onClick={() => {
                  navigator("/questions");
                }}
                className="cursor-pointer hover:text-gray-200 "
              >
                Questions
              </p>
              <p
                onClick={() => {
                  navigator("/notes");
                }}
                className="cursor-pointer hover:text-gray-200 "
              >
                Make your own notes
              </p>
              <p
                onClick={() => {
                  navigator("/users");
                }}
                className="cursor-pointer hover:text-gray-200 "
              >
                Users
              </p>
            </div>
            <div className="underline">
              <p
                onClick={() => {
                  navigator("/about");
                }}
                className="cursor-pointer hover:text-gray-200 "
              >
                About
              </p>
              <p
                onClick={() => {
                  navigator("/");
                }}
                className="cursor-pointer hover:text-gray-200 "
              >
                Home
              </p>
              <p
                onClick={() => {
                  navigator("/signup");
                }}
                className="cursor-pointer hover:text-gray-200 "
              >
                Join
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-11 text-white">
          <p>©2023 Arham Stack</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
