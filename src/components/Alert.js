import React from "react";
import { useSelector } from "react-redux";
const Alert = () => {
  const alert = useSelector((state) => state.alert);

  return (
    <>
      <div
        className={`z-50 w-full fixed ${
          alert.color === "red" ? "bg-red-800" : "bg-green-800"
        } text-white px-4 py-3 rounded`}
        role="alert"
      >
        <strong className="text-xl font-thin">{alert.text}</strong>
      </div>
    </>
  );
};

export default Alert;
