import * as actionTypes from "./actionTypes";
import { localhost } from "../../Helpers/urls";
import axios from "axios";

const getEnrolledCourseListStart = () => {
  return {
    type: actionTypes.GET_ENROLLEDCOURSELIST_START,
  };
};

const getEnrolledCourseListSuccess = (enrolledCourseList) => {
  return {
    type: actionTypes.GET_ENROLLEDCOURSELIST_SUCCESS,
    enrolledCourseList,
  };
};

const getEnrolledCourseListFail = (error) => {
  return {
    type: actionTypes.GET_ENROLLEDCOURSELIST_FAIL,
    error: error,
  };
};

export const getEnrolledCourseList = (username, order) => {
  const category = "GENERAL_ENGLISH";
  return (dispatch) => {
    dispatch(getEnrolledCourseListStart());
    axios
      .get(
        `${localhost}/courses/course-current-detail/${username}/${category}/${order}/`
      )
      .then((res) => {
        const enrolledCourseList = res.data;
        dispatch(getEnrolledCourseListSuccess(enrolledCourseList));
      })
      .catch((err) => {
        dispatch(getEnrolledCourseListFail(err));
      });
  };
};
