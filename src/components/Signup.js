import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adminsignupmodal from "./Adminsignupmodal";
import { useDispatch } from "react-redux";
import { loadingBar } from "../state/Action-creator";
import { isAlert } from "../state/Action-creator";
import { registerGoogle } from "../state/Action-creator";
import { signUp } from "../state/Action-creator";
const Signup = () => {
  document.title = "Signup - Arham Stack";
  document.body.style.backgroundColor = "#f1f1f1";
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
  const [usercredentials, setusercredentials] = useState({
    name: "",
    email: "",
    password: "",
    isVerified: false,
  });
  const onChange = (e) => {
    setusercredentials({ ...usercredentials, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(usercredentials, navigator, loadingBar, isAlert));
  };
  const toLogin = () => {
    navigator("/signin");
  };
  const adminsignupModal = () => {
    setOpen(true);
  };

  const handleCallbackResponse = async (response) => {
    dispatch(registerGoogle(response, navigator, loadingBar, isAlert));
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: `${process.env.REACT_APP_CLIENT_ID}`,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "outline",
      size: "large",
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="md:flex mt-20">
        <div className="mt-8 text-center mb-8 md:w-1/2 md:mt-40 text-gray-800">
          <p className="mb-4 text-[#4c5d6f] font-semibold text-xl">
            Create your Arham Stack Account.
          </p>
          <p>It's free and only take a minute.</p>
          <p>Join the Arham Stack community</p>
          <div className="flex justify-center mt-8" id="signUpDiv"></div>
        </div>
        <div className="md:w-1/2 md:mt-12">
          <div className="bg-white w-10/12 m-auto py-8 shadow-lg">
            <form
              onSubmit={handlesubmit}
              className="space-y-6 w-10/12 m-auto"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Display Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={onChange}
                    value={usercredentials.name}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={onChange}
                    value={usercredentials.email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={onChange}
                    value={usercredentials.password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-center text-gray-500">
                  Passwords must contain at least five characters,
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={
                    usercredentials.password.length < 5 ||
                    usercredentials.password.length < 3
                  }
                  className={`${
                    usercredentials.name.length < 3 ||
                    usercredentials.email.length === 0 ||
                    usercredentials.password.length < 5
                      ? "bg-indigo-400 text-white"
                      : "active:bg-black hover:text-black hover:border hover:border-black hover:bg-transparent"
                  }  w-full transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]`}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mt-6">
            <div className="text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer text-sm"
                onClick={toLogin}
              >
                Log in
              </span>
            </div>
            <div className="text-sm mb-9">
              Are you an employer?{" "}
              <span
                onClick={adminsignupModal}
                className="text-blue-600 text-sm cursor-pointer"
              >
                {" "}
                Signup here
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-44">
        <div id="signUpDiv"></div>
      </div>
      <Adminsignupmodal open={open} setOpen={setOpen} />
    </>
  );
};

export default Signup;
