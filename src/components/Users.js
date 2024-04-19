import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { fetchUserInformation } from "../state/Action-creator";
import { fetchAllUsers } from "../state/Action-creator";
import Modal from "./Modal";
import { useState } from "react";
const Users = () => {
  document.title = "Users - Arham Stack";
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.mydetails.user);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    text: "",
    id: "",
    url: "",
  });
  const deleteButton = async (e, id) => {
    e.preventDefault();
    setModalData({
      title: "Confirm you want to delete this user?",
      text: "This user will be deleted permanentaly",
      id: id,
      url: "deleteuser",
    });
    setOpen(true);
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchUserInformation());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="mt-24 w-10/12 m-auto my-8 text-2xl text-[#4c5d6f] font-bold">
        <h1>Users</h1>
      </div>

      <div>
        <div className="mx-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.users?.map((item, index) => (
              <div key={index}>
                {/* {item.role === "user" && ( */}
                <div className="bg-white p-4 shadow-md">
                  <div className="flex">
                    <div className="">
                      <img
                        className="mt-3 h-10 w-10 bg-gray-500"
                        src={item.CoverPhoto?.url}
                        alt="user"
                      />
                    </div>
                    <div className="pl-2">
                      <h2 className="text-xl font-bold text-[#4c5d6f]">
                        {item.name}
                      </h2>
                      <p className="text-blue-600 font-semibold mt-2">
                        Reputation {item.reputation}
                      </p>
                    </div>
                    {user.user?.role === "admin" && (
                      <div className="m-auto">
                        <button>
                          <FontAwesomeIcon
                            onClick={(e) => deleteButton(e, item._id)}
                            icon={faRemove}
                            className="text-red-500 mr-2 cursor-pointer"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm mt-2 text-blue-600">
                    questions {item.questions}
                  </p>
                  <p className="text-sm mt-2 text-blue-600">
                    answers {item.answers}
                  </p>
                  <p className="mt-2 text-gray-600">
                    {item.about.slice(0, 30)}
                  </p>
                  <p className="text-gray-600 mt-2">{item.country}</p>
                </div>
                {/* // )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} modalData={modalData} />
    </>
  );
};

export default Users;
