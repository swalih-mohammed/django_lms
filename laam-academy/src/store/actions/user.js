import * as actionTypes from "./actionTypes";
import { localhost } from "../../Helpers/urls";
import axios from "axios";

const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START,
  };
};

const getUserSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user,
  };
};

const getUserFail = (error) => {
  return {
    type: actionTypes.GET_USER_FAIL,
    error: error,
  };
};

export const getUser = (pk) => {
  console.log("getting user");
  return (dispatch) => {
    dispatch(getUserStart());
    axios
      .get(`${localhost}/users/details/${pk}/`)
      .then((res) => {
        const user = res.data;
        // console.log(user);
        dispatch(getUserSuccess(user));
      })
      .catch((err) => {
        dispatch(getUserFail(err));
      });
  };
};
export const updateCurrentCourse = (user_id, student_id, course_id, level) => {
  console.log("updaging  user", user_id, student_id, course_id, level);
  return (dispatch) => {
    dispatch(getUserStart());
    const data = {
      user: user_id,
      current_course: course_id,
      level: level,
    };
    console.log(data);
    axios
      .put(`${localhost}/users/change-current-course/${student_id}/`, data)
      .then((res) => {
        const user = res.data;
        // console.log("rest form current course change", user);
        dispatch(getUser(user_id));
      })
      .catch((err) => {
        dispatch(getUserFail(err));
        console.log(err);
      });
  };
};
