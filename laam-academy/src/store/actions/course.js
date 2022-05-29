// import axios from "axios";
import * as actionTypes from "./actionTypes";
import { localhost } from "../../Helpers/urls";
import axios from "axios";

const getCourseStart = () => {
  return {
    type: actionTypes.GET_COURSE_START,
  };
};

const getCourseSuccess = (course) => {
  return {
    type: actionTypes.GET_COURSE_SUCCESS,
    course,
  };
};

const getCourseFail = (error) => {
  return {
    type: actionTypes.GET_COURSE_FAIL,
    error: error,
  };
};

export const getCourse = (user_id) => {
  return (dispatch) => {
    dispatch(getCourseStart());
    axios
      .get(`${localhost}/courses/course-current-detail/${user_id}/`)
      .then((res) => {
        const course = res.data[0];
        dispatch(getCourseSuccess(course));
      })
      .catch((err) => {
        dispatch(getCourseFail());
      });
  };
};
