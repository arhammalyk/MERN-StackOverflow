import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAlert, loadingBar } from "../state/Action-creator";
import { useDispatch } from "react-redux";
import { accountRecovery } from "../state/Action-creator";

const Accountrecovery = () => {
  document.title = "Account Recovery - Arham Stack";
  document.body.style.backgroundColor = "#f1f1f1";
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [newpassword, setpassword] = useState({
    password: "",
  });
  const onChange = (e) => {
    setpassword({
      ...newpassword,
      [e.target.name]: e.target.value,
    });
  };
  const gettoken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("token");
  };
  const token = gettoken();
  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(
      accountRecovery(token, newpassword, navigator, loadingBar, isAlert)
    );
  };
  return (
    <>
      <div className="bg-white shadow-lg m-auto py-8 mb-11 my-28 w-1/3">
        <form
          onSubmit={handlesubmit}
          className="space-y-6 w-10/12 m-auto"
          action="#"
          method="POST"
          placeholder="Enter new password"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New password
            </label>
            <div className="mt-2">
              <input
                onChange={onChange}
                value={newpassword.password}
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`${
                newpassword.password.length < 5
                  ? "bg-indigo-400 text-white"
                  : "active:bg-black hover:text-black hover:border hover:border-black hover:bg-transparent"
              }  w-full transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]`}
            >
              Recover Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Accountrecovery;
