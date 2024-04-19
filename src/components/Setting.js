import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInformation } from "../state/Action-creator";
import { isAlert, loadingBar } from "../state/Action-creator";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { changeName } from "../state/Action-creator";
import { deleteAccount } from "../state/Action-creator";
import { changePassword } from "../state/Action-creator";
const Setting = () => {
  document.title = "Setting - Arham Stack";
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.mydetails.user);
  const [resetCredentials, setresetCredentials] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    name: "",
  });
  const [render, setRender] = useState({ condition: "bydefault" });
  const onChange = (e) => {
    setresetCredentials({
      ...resetCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeName = async (e) => {
    e.preventDefault();
    dispatch(changeName(resetCredentials, loadingBar, isAlert));
  };
  const handleDeactivate = async (e) => {
    e.preventDefault();
    dispatch(deleteAccount(navigator, loadingBar, isAlert));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(
      changePassword(user.user?.email, resetCredentials, loadingBar, isAlert)
    );
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUserInformation());
    } else {
      navigator("/signin");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="mt-20 mb-10">
        <div className="mt-16 md:flex md:pr-16">
          <div className="md:w-1/2 p-4 md:pl-52 space-y-3 pt-16 text-gray-500">
            <h1
              onClick={() => {
                setRender({
                  condition: "updatename",
                });
              }}
              className="hover:text-black hover:bg-gray-200 rounded p-2 cursor-pointer font-semibold"
            >
              Update name
              <FontAwesomeIcon
                icon={faAngleRight}
                className="ml-52 text-red-500 mr-2 cursor-pointer active:text-black"
              />
            </h1>
            <h1
              onClick={() => {
                setRender({
                  condition: "changepassword",
                });
              }}
              className="hover:text-black hover:bg-gray-200 rounded p-2 cursor-pointer font-semibold"
            >
              Change password
              <FontAwesomeIcon
                icon={faAngleRight}
                className="ml-44 text-red-500 mr-2 cursor-pointer active:text-black"
              />
            </h1>
            <h1
              onClick={() => {
                setRender({
                  condition: "deletemyaccount",
                });
              }}
              className="hover:text-black hover:bg-gray-200 rounded p-2 cursor-pointer font-semibold"
            >
              Deactivate your account
              <FontAwesomeIcon
                icon={faAngleRight}
                className="ml-32 text-red-500 mr-2 cursor-pointer active:text-black"
              />
            </h1>
          </div>
          <div className="md:w-1/2 ">
            {render.condition === "bydefault" && (
              <div className="p-10">
                <div>
                  <h1 className="text-2xl text-gray-700">Activity data</h1>
                  <div className="rounded-t border border-gray-300 p-8 mt-3">
                    <p className="font-semibold">
                      Arham Stack never sells or shares your activity data with
                      third parties.
                    </p>
                    <p className="mt-3 text-gray-600">
                      We use your on-site activity to show you more relevant
                      content. For example, we might show you questions based on
                      the tags you usually browse, or show you job listings in
                      your current location.
                    </p>
                  </div>
                  <div className="rounded-b border border-gray-300 p-8">
                    <p className="font-semibold">
                      Use my on-site activity to show more relevant content
                      (recommended)
                    </p>
                    <p className="mt-3 text-gray-600">
                      If you opt-out, existing recommendations will be discarded
                      within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* change password */}
            {render.condition === "changepassword" && (
              <div>
                <div className="text-center md:w-10/12 mt-4">
                  <h1 className="font-bold text-lg">Update password</h1>
                  <p>@{user.user?.name}</p>
                </div>
                <form
                  onSubmit={handlesubmit}
                  className="space-y-6 w-10/12 m-auto"
                  action="#"
                  method="POST"
                >
                  <div className="flex items-center">
                    <div className="mr-5 w-28">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                    </div>
                    <div className="mt-2 w-60">
                      <input
                        readOnly
                        value={user.user?.email}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-5 w-28">
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Current password
                      </label>
                    </div>
                    <div className="mt-2 w-60">
                      <input
                        value={resetCredentials.currentPassword}
                        onChange={onChange}
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Current password"
                        type="password"
                        required
                        autoComplete="password"
                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-5 w-28">
                      <label
                        htmlFor="NewPassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        New password
                      </label>
                    </div>
                    <div className="mt-2 w-60">
                      <input
                        placeholder="At least 5 characters"
                        value={resetCredentials.newPassword}
                        onChange={onChange}
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        autoComplete="password"
                        required
                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-5 w-28">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm password
                      </label>
                    </div>
                    <div className="mt-2 w-60">
                      <input
                        value={resetCredentials.confirmPassword}
                        onChange={onChange}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="password"
                        placeholder="At least 5 characters"
                        required
                        className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <div>
                      <button
                        type="submit"
                        disabled={
                          resetCredentials.currentPassword.length < 5 ||
                          resetCredentials.newPassword.length < 5 ||
                          resetCredentials.confirmPassword.length < 5
                        }
                        className={`${
                          resetCredentials.currentPassword.length < 5 ||
                          resetCredentials.newPassword.length < 5 ||
                          resetCredentials.confirmPassword.length < 5
                            ? "bg-indigo-400 text-white"
                            : "active:bg-black hover:text-black hover:border hover:border-black hover:bg-transparent"
                        }  w-full transition-all duration-500 mt-3 rounded px-8 py-2 text-[#4c5d6f] border border-[#4c5d6f]`}
                      >
                        Confirm change
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {/* update name */}
            {render.condition === "updatename" && (
              <div className="md:w-10/12 mt-4">
                <h1 className="text-center font-bold text-xl">Update name</h1>
                <div className="p-4">
                  <h1 className="font-semibold">Current</h1>
                  <h1>{user.user?.name}</h1>
                </div>
                <div className="p-4">
                  <h1 className="font-semibold">New</h1>
                  <input
                    value={resetCredentials.name}
                    onChange={onChange}
                    name="name"
                    placeholder="Username"
                    id="name"
                    type="text"
                    required
                    className="mt-1 pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-1 focus:ring-[#4c5d6f] sm:text-sm sm:leading-6"
                  />
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleChangeName}
                      disabled={resetCredentials.name.length < 3}
                      minLength={3}
                      className={`${
                        resetCredentials.name.length < 3 && "text-red-400"
                      } px-2 py-1 text-red-500 font-bold rounted`}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* delete my account */}
            {render.condition === "deletemyaccount" && (
              <div className="md:w-10/12 p-4">
                <div className="text-center">
                  <h1 className="font-bold text-lg">Deactivate your account</h1>
                  <h2>@{user.user?.name}</h2>
                </div>
                <div>
                  <h1 className="font-bold mt-2">
                    This will deavtivate your account
                  </h1>
                  <p className="mt-2 ">
                    You're about to start the process of deactivating your Arham
                    Stack account. Your display name , comments , asked question
                    and public profile will no longer be viewable on Arham Stack
                    .
                  </p>

                  <h1 className="font-bold mt-6">What else you should know</h1>
                  <p className="mt-2 ">
                    If you just want to change your @username, you dont need to
                    deactivate your account - edit it in your{" "}
                    <span className="text-blue-500">settings.</span>
                  </p>
                  <p className="mt-2 ">
                    Your account will be deleted permanentaly
                  </p>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleDeactivate}
                    className="text-red-500 text-lg font-bold"
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
