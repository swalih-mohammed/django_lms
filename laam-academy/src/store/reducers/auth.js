import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  id: null,
  email: null,
  name: null,
  is_teacher: null,
  is_test_user: null,
  error: null,
  loading: false,
  message: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    message: null,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    id: action.user.id,
    email: action.user.email,
    name: action.user.name,
    is_teacher: action.user.is_teacher,
    is_test_user: action.user.is_test_user,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    id: null,
    email: null,
    error: null,
    loading: false,
  });
};

const AuthpasswordSuccess = (state, action) => {
  // console.log("action", action.message);
  return updateObject(state, {
    error: null,
    loading: false,
    message: action.message,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_PASSWORD_CHANGE_SUCCESS:
      return AuthpasswordSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
