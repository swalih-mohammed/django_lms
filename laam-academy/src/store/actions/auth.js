import axios from "axios";
import * as actionTypes from "./actionTypes";
import { localhost } from "../../Helpers/urls";
// import { authAxios } from "../../Helpers/authAxios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const passwordResetSuccess = (message) => {
  return {
    type: actionTypes.AUTH_PASSWORD_CHANGE_SUCCESS,
    message,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  console.log("loggin in");
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${localhost}/dj-rest-auth/login/`, {
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res.data);
        const user = {
          token: res.data.key,
          id: res.data.user,
          email: res.data.email,
          name: res.data.name,
          is_teacher: res.data.is_teacher,
          is_test_user: res.data.is_test_user,
        };

        dispatch(authSuccess(user));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    const user = {
      username,
      email,
      password1,
      password2,
      is_student: true,
      is_teacher: false,
    };
    axios
      .post(`${localhost}/dj-rest-auth/registration/`, user)
      .then((res) => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          is_student: true,
          is_teacher: false,
          // expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        // localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const changePassword = (password1, password2, oldPass, token) => {
  const authAxios = axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return (dispatch) => {
    dispatch(authStart());
    const data = {
      new_password1: password1,
      new_password2: password2,
      old_password: oldPass,
    };

    authAxios
      .post(`${localhost}/dj-rest-auth/password/change/`, data)
      .then((res) => {
        dispatch(passwordResetSuccess(res.data.detail));
      })
      .catch((err) => {
        dispatch(authFail(err));
        console.log(err);
      });
  };
};

export const authResetPassword = (email) => {
  console.log(email);
  // console.log("firing");
  return (dispatch) => {
    // dispatch(authStart());
    axios
      .post(`${localhost}/rest-auth/password/reset/`, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        // dispatch(authSuccess(res));
      })
      .catch((err) => {
        dispatch(authFail(err));
        console.log("error in catch passwrod reset", err);
      });
  };
};
