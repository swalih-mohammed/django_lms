import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  user: {},
  loading: false,
  error: null,
};
const userStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const userSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    user: action.user,
  });
};
const userFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_START:
      return userStart(state, action);
    case actionTypes.GET_USER_SUCCESS:
      return userSuccess(state, action);
    case actionTypes.GET_USER_FAIL:
      return userFail(state, action);
    default:
      return state;
  }
};
export default reducer;
