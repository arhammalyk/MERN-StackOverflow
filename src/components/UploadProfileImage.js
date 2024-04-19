import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfilePicture } from "../state/Action-creator";
import { useState } from "react";
const UploadProfileImage = () => {
  const user = useSelector((state) => state.mydetails.user);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("gere", selectedFile);

      // dispatch(addProfilePicture(formData, fetchUserInformation));
    }
  };
  return (
    <>
      {!user.user?.isVerified && (
        <div className="md:w-1/2 md:ml-4 mt-6 flex justify-center">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadProfileImage;
