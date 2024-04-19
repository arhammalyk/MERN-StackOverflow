import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Forgotpasswordmodal from "./Forgotpasswordmodal";
import { useDispatch } from "react-redux";
import { isAlert, loadingBar } from "../state/Action-creator";
import { Link } from "react-router-dom";
import { signIn } from "../state/Action-creator";
import { registerGoogle } from "../state/Action-creator";
const Signin = () => {
  document.body.style.backgroundColor = "#f1f1f1";
  document.title = "Signin - Arham Stack";
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
  const [signincredentials, setsignincredentials] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setsignincredentials({
      ...signincredentials,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(signIn(signincredentials, navigator, loadingBar, isAlert));
  };

  const toSignup = () => {
    navigator("/signup");
  };
  const toAdminportal = () => {
    navigator("/adminportal");
  };
  const forgotpasswordModal = () => {
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
            Signin your Arham Stack Account.
          </p>
          <p>Join the Arham Stack community</p>
          <div className="flex justify-center mt-8" id="signUpDiv"></div>
        </div>
        <div className="md:w-1/2 md:mt-12">
          <div className="bg-white shadow-lg w-10/12 m-auto py-8">
            <form
              onSubmit={handlesubmit}
              className="space-y-6 w-10/12 m-auto"
              action="#"
              method="POST"
            >
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
                    value={signincredentials.email}
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
                  <div className="text-sm">
                    <Link
                      onClick={forgotpasswordModal}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={onChange}
                    value={signincredentials.password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={
                    signincredentials.email.length === 0 ||
                    signincredentials.password.length === 0
                  }
                  className={`${
                    signincredentials.email.length === 0 ||
                    signincredentials.password.length === 0
                      ? "bg-indigo-400 text-white"
                      : "active:bg-black hover:text-black hover:border hover:border-black hover:bg-transparent"
                  }  w-full transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]`}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="text-center my-6 ">
            <div className="text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer text-sm"
                onClick={toSignup}
              >
                {" "}
                Sign Up
              </span>
            </div>
            <div className="text-sm">
              Are you an employer?{" "}
              <span
                className="text-blue-600 cursor-pointer text-sm"
                onClick={toAdminportal}
              >
                {" "}
                Login here
              </span>
            </div>
          </div>
        </div>
      </div>
      <Forgotpasswordmodal open={open} setOpen={setOpen} />
    </>
  );
};

export default Signin;
