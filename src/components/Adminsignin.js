import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAlert } from "../state/Action-creator";
import { loadingBar } from "../state/Action-creator";
import { adminSignIn } from "../state/Action-creator";

const Adminsignin = () => {
  document.title = "Admin signin - Arham Stack";
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [admincredentials, setadmincredentials] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setadmincredentials({
      ...admincredentials,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(adminSignIn(admincredentials, navigator, loadingBar, isAlert));
  };
  return (
    <>
      <div className="md:flex mt-20">
        <div className="mt-8 text-center mb-8 md:w-1/2 md:mt-40 text-gray-800">
          <p className="mb-4 text-[#4c5d6f] font-semibold text-xl">
            Admin Portal
          </p>
          <p>Signin your Arham Stack Account.</p>
        </div>
        <div className="md:w-1/2 md:mt-12">
          <div className="bg-white shadow-lg w-10/12 m-auto py-8 mb-11">
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
                    value={admincredentials.email}
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
                    value={admincredentials.password}
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
                  className={`${
                    admincredentials.email.length === 0 ||
                    admincredentials.password.length === 0
                      ? "bg-indigo-400 text-white"
                      : "active:bg-black hover:text-black hover:border hover:border-black hover:bg-transparent"
                  }  w-full transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]`}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminsignin;
