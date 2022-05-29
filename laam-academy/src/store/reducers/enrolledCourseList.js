import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  enorlledCourseList: [],
  loading: false,
  error: null,
};
const enrolledCourseListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const enrolledCourseListSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    enorlledCourseList: action.enrolledCourseList,
  });
};
const enrolledCourseListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ENROLLEDCOURSELIST_START:
      return enrolledCourseListStart(state, action);
    case actionTypes.GET_ENROLLEDCOURSELIST_SUCCESS:
      return enrolledCourseListSuccess(state, action);
    case actionTypes.GET_COURSELIST_FAIL:
      return enrolledCourseListFail(state, action);
    default:
      return state;
  }
};
export default reducer;
