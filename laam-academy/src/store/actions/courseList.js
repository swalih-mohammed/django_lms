import * as actionTypes from "./actionTypes";
import { localhost } from "../../Helpers/urls";
import axios from "axios";

const getCourseListStart = () => {
  return {
    type: actionTypes.GET_COURSELIST_START,
  };
};

const getCourseListSuccess = (courseList) => {
  return {
    type: actionTypes.GET_COURSELIST_SUCCESS,
    courseList,
  };
};

const getCourseListFail = (error) => {
  return {
    type: actionTypes.GET_COURSELIST_FAIL,
    error: error,
  };
};

export const getCourseList = (id) => {
  console.log("fetching course list", id);
  return (dispatch) => {
    dispatch(getCourseListStart());
    axios
      .get(`${localhost}/courses/course-by-category-list/${id}/`)
      .then((res) => {
        const courseList = res.data;
        // console.log("course list from rdu", courseList);
        dispatch(getCourseListSuccess(courseList));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getCourseListFail(err));
      });
  };
};
