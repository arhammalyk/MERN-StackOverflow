import jwtDecode from "jwt-decode";

//if signed in set true
export const issignin = (value) => {
  return (dispatch) => {
    dispatch({
      type: "issignin",
      payload: value,
    });
  };
};

//storing all profile details of a user
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const getUserDetails = (users) => {
  return {
    type: GET_USER_DETAILS,
    payload: users,
  };
};

//storing all notes of a user
export const FETCH_ALL_NOTES = "ALL_NOTES";
export const fetchAllNotes = (notes) => {
  return {
    type: FETCH_ALL_NOTES,
    payload: notes,
  };
};

//setting loading bar value
export const LOADING_BAR = "LOADING_BAR";
export const loadingBar = (value) => {
  return {
    type: LOADING_BAR,
    payload: value,
  };
};

//set true to show alert bar
export const IS_ALERT = "IS_ALERT";
export const isAlert = (boolValue, text, color) => {
  return {
    type: IS_ALERT,
    payload: {
      boolValue,
      text,
      color,
    },
  };
};

//fetching specific user all profile information
export const fetchUserInformation = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/auth/fetchuserinfo`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const userData = await response.json();
    // Dispatch an action with the fetched user information
    dispatch({ type: "FETCH_USER_SUCCESS", payload: userData });
  } catch (error) {
    console.error(error);
    // Dispatch an action for error handling, if needed
    dispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
  }
};

//fetching all question of all users
export const fetchAllQuestions = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/fetchquestions`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    const questions = json.questions;
    // Dispatch an action with the fetched user information
    dispatch({ type: "FETCH_QUESTIONS_SUCCESS", payload: questions });
  } catch (error) {
    console.error(error);
  }
};

//fetching specfic user all asked question
export const fetchUserQuestions = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/userquestions`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    const userQuestions = json.questions;
    // Dispatch an action with the fetched user information
    dispatch({ type: "FETCH_USER_QUESTIONS", payload: userQuestions });
  } catch (error) {
    console.error(error);
  }
};

//Fetching a specific question all comments
export const fetchQuestionComments = (questionId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/fetchcomments/${questionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    const comments = json.comments;
    // Dispatch an action with the fetched user information
    dispatch({ type: "FETCH_COMMENTS_SUCCESS", payload: comments });
  } catch (error) {
    console.error(error);
  }
};

//Fetching all users profile data
export const fetchAllUsers = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/auth/fetchallusers`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    // Dispatch an action with the fetched user information
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: json });
  } catch (error) {
    console.error(error);
  }
};

// fetch specific question by id
export const fetchQuestionDetails = (questionId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/fetchquestion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: questionId,
        }),
      }
    );
    const json = await response.json();
    dispatch({ type: "POST-DETAILS", payload: json });
  } catch (error) {
    console.error(error);
  }
};

// fetch a comment by id
export const fetchComment = (commentId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/fetchOneComment/${commentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      dispatch({ type: "FETCH_COMMENT_SUCCESS", payload: json.comment });
    }
  } catch (error) {
    console.error(error);
  }
};

// Ask question (post public question) login required
export const addQuestion =
  (question, navigator, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/question/addquestion`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: question.title,
            description: question.description,
          }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
      if (json.success) {
        navigator("/questions");
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Uploaded Successfully", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      } else {
        dispatch(isAlert(true, "Something went wrong", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

// Edit question login required
export const editQuestion =
  (id, question, navigator, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/question/editQuestion`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            title: question.title,
            description: question.description,
          }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
      if (json.success) {
        navigator("/questions");
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Updated Successfully", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      } else {
        dispatch(isAlert(true, "Something went wrong", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

// Delete owned asked question
export const deleteQuestion =
  (questionId, fetchUserQuestions, loadingBar, isAlert, navigator) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/question/deletequestion`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: questionId,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        navigator("/profile");
        dispatch(fetchUserQuestions());
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Deleted", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      } else {
        dispatch(isAlert(true, "Error", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

//Add comment to a specific question
export const addComment =
  (questionId, answer, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/question/addcomment/${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            comment: answer.answer,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch(fetchQuestionComments(questionId));
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(
          isAlert(
            true,
            "Comment added successfully also rewarded with 5 points of reputation",
            "green"
          )
        );
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      } else {
        dispatch(isAlert(true, json.msg, "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

// Delete owned comment
export const deleteComment =
  (commentId, questionId, fetchQuestionComments, loadingBar, isAlert) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/question/deletecomment`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            commentId: commentId,
            questionId: questionId,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch(fetchQuestionComments(questionId));
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Deleted", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      } else {
        dispatch(isAlert(true, "Error", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

// Update user comment
export const updateComment =
  (questionId, commentId, answer) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/question/editComment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            commentId: commentId,
            answer: answer.answer,
          }),
        }
      );
      await response.json();
      dispatch(fetchQuestionComments(questionId));
    } catch (error) {
      console.error(error);
    }
  };

// incremant vote of a question
export const questionVoteUp = (questionId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/handlevote`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          questionId: questionId,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      dispatch(fetchQuestionDetails(questionId));
      dispatch(loadingBar(100));
      setTimeout(() => {
        dispatch(loadingBar(0));
      }, 1000);
      dispatch(
        isAlert(
          true,
          "Added and rewarded with 5 points of reputations",
          "green"
        )
      );
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(isAlert(true, "You already voted", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    }
  } catch (error) {
    console.error(error);
  }
};

// decrement vote of a question
export const questionVoteDown = (questionId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/handlevotedown`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          questionId: questionId,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      dispatch(fetchQuestionDetails(questionId));
      dispatch(loadingBar(100));
      setTimeout(() => {
        dispatch(loadingBar(0));
      }, 1000);
      dispatch(
        isAlert(
          true,
          "Added and rewarded with 5 points of reputations",
          "green"
        )
      );
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(isAlert(true, "You already voted", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    }
  } catch (error) {
    console.error(error);
  }
};

// incremant vote of a answer
export const answerVoteUp = (answerId, questionId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/handleanswervoteup`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          answerId: answerId,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      dispatch(fetchQuestionComments(questionId));
      dispatch(loadingBar(100));
      setTimeout(() => {
        dispatch(loadingBar(0));
      }, 1000);
      dispatch(
        isAlert(
          true,
          "Added and rewarded with 5 points of reputations",
          "green"
        )
      );
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(isAlert(true, "You already voted", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    }
  } catch (error) {
    console.error(error);
  }
};

// decrement vote of a answer
export const answerVoteDown = (answerId, questionId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/question/handleanswervotedown`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          answerId: answerId,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      dispatch(fetchQuestionComments(questionId));
      dispatch(loadingBar(100));
      setTimeout(() => {
        dispatch(loadingBar(0));
      }, 1000);
      dispatch(
        isAlert(
          true,
          "Added and rewarded with 5 points of reputations",
          "green"
        )
      );
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(isAlert(true, "You already voted", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    }
  } catch (error) {
    console.error(error);
  }
};

// personal notes//
// Update user personal note
export const updateNote = (id, note) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          tag: "general",
        }),
      }
    );
    await response.json();
    dispatch(fetchNote());
  } catch (error) {
    console.error(error);
  }
};

// Delete user personal note
export const deleteNote = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    await response.json();
    dispatch(fetchNote());
  } catch (error) {
    console.error(error);
  }
};

// Fetch user all personal note
export const fetchNote = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/notes/fetchnotes`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const userallnotes = await response.json();
    dispatch(fetchAllNotes(userallnotes));
  } catch (error) {
    console.error(error);
  }
};

// Add new user personal note
export const addNote = (note, loadingBar, isAlert) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/notes/addnote`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          tag: "general",
        }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json();
    if (json.success) {
      dispatch(fetchNote());
      dispatch(loadingBar(100));
      setTimeout(() => {
        dispatch(loadingBar(0));
      }, 1000);
      dispatch(isAlert(true, "New note added", "green"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    } else {
      dispatch(isAlert(true, "Something went wrong", "red"));
      setTimeout(() => {
        dispatch(isAlert(false));
      }, 2000);
    }
  } catch (error) {
    console.error(error);
  }
};
// personal notes//

//accounts setting//
// account recovery change password no signin required
export const accountRecovery =
  (token, newpassword, navigator, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/resetpassword?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: newpassword.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Password changed successfully", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
        navigator("/signin");
      } else {
        dispatch(isAlert(true, "Something went wrong", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

//Changeing user name
export const changeName =
  (resetCredentials, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/changename`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: resetCredentials.name,
          }),
        }
      );
      const json = await response.json();
      if (json.success === true) {
        dispatch(fetchUserInformation());
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Username changed", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      } else {
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Something went wrong", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

//Deactivating account (delete permanentaly)
export const deleteAccount =
  (navigator, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/deactivate`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      if (json.success === true) {
        localStorage.removeItem("token");
        navigator("/");
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Account deactivated successfully", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      } else {
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Something went wrong", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

//Change account password (login required)
export const changePassword =
  (email, resetCredentials, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/changepassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            email: email,
            currentPassword: resetCredentials.currentPassword,
            newPassword: resetCredentials.newPassword,
            confirmPassword: resetCredentials.confirmPassword,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Password changed", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      } else {
        dispatch(isAlert(true, "Enter correct credentials", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

// Add about section
export const addAboutSection =
  (about, fetchUserInformation, setshowAboutInput) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/addabout`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            about: about.about,
          }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
      if (json.success === true) {
        dispatch(fetchUserInformation());
        setshowAboutInput(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

// Add profile picture
export const addProfilePicture =
  (picture, fetchUserInformation) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/addPicture`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            picture: picture,
          }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
      if (json.success === true) {
        dispatch(fetchUserInformation());
      }
    } catch (error) {
      console.error(error);
    }
  };

//accounts setting//

//authentication//
//create an account
export const signUp =
  (usercredentials, navigator, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: usercredentials.name,
            email: usercredentials.email,
            password: usercredentials.password,
            isVerified: false,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Successfully Signed up", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
        issignin(true);
        localStorage.setItem("token", json.authtoken);
        navigator("/questions");
      } else {
        dispatch(isAlert(true, json.error, "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

//Register an account through google
export const registerGoogle =
  (response, navigator, loadingBar, isAlert) => async (dispatch) => {
    try {
      var userObject = jwtDecode(response.credential);
      if (response.credential && userObject.email) {
        const res = await fetch(
          `${process.env.REACT_APP_LOCAL}/auth/registerGoogle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userObject.given_name,
              email: userObject.email,
              picture: userObject.picture,
              isVerified: userObject.email_verified,
              googleToken: response.credential,
            }),
          }
        );
        const json = await res.json();
        if (json.success) {
          dispatch(loadingBar(100));
          setTimeout(() => {
            dispatch(loadingBar(0));
          }, 1000);
          dispatch(isAlert(true, "Successfully Signed up", "green"));
          setTimeout(() => {
            dispatch(isAlert(false));
          }, 2000);
          issignin(true);
          localStorage.setItem("token", json.authtoken);
          navigator("/questions");
        } else {
          dispatch(isAlert(true, json.error, "red"));
          setTimeout(() => {
            dispatch(isAlert(false));
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

//Sign In
export const signIn =
  (signincredentials, navigator, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signincredentials.email,
            password: signincredentials.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success === true) {
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Successfully Signed in", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
        issignin(true);
        localStorage.setItem("token", json.authtoken);
        navigator("/questions");
      } else {
        dispatch(isAlert(true, "Enter correct credentials", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

//Admin sign in
export const adminSignIn =
  (admincredentials, navigator, loadingBar, isAlert) => async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/adminsignin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: admincredentials.email,
            password: admincredentials.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Successfully Signin", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
        issignin(true);
        localStorage.setItem("token", json.authtoken);
        navigator("/questions");
      } else {
        dispatch(isAlert(true, "Enter correct credentials", "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

//Admin sign up
export const adminSignUp =
  (admintoken, usercredentials, navigator, loadingBar, isAlert) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/adminsignup?admintoken=${admintoken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: usercredentials.name,
            email: usercredentials.email,
            password: usercredentials.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch(loadingBar(100));
        setTimeout(() => {
          dispatch(loadingBar(0));
        }, 1000);
        dispatch(isAlert(true, "Admin Account created successfully", "green"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
        issignin(true);
        localStorage.setItem("token", json.authtoken);
        navigator("/questions");
      } else {
        dispatch(isAlert(true, json.error, "red"));
        setTimeout(() => {
          dispatch(isAlert(false));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

//authentication//

//fetch products
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/auth/fetchProducts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: json });
  } catch (error) {
    console.error(error);
  }
};
