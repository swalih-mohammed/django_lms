import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  course: {},
  loading: false,
  error: null,
};
const courseStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const courseSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    course: action.course,
  });
};
const courseFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COURSE_START:
      return courseStart(state, action);
    case actionTypes.GET_COURSE_SUCCESS:
      return courseSuccess(state, action);
    case actionTypes.GET_COURSE_FAIL:
      return courseFail(state, action);
    default:
      return state;
  }
};
export default reducer;
