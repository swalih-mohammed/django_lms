import * as actionTypes from "./actionTypes";
import { localhost } from "../../Helpers/urls";
import axios from "axios";

const getUnitStart = () => {
  return {
    type: actionTypes.GET_UNIT_START,
  };
};

const getUnitSuccess = (unit) => {
  return {
    type: actionTypes.GET_UNIT_SUCCESS,
    unit,
  };
};

const getUnitFail = (error) => {
  return {
    type: actionTypes.GET_UNIT_FAIL,
    error: error,
  };
};

export const getUnit = (unit_id, user_id) => {
  console.log(
    "fetching unit from redux, unit id and user id",
    unit_id,
    user_id
  );
  return (dispatch) => {
    dispatch(getUnitStart());
    axios
      .get(`${localhost}/courses/units/${unit_id}/${user_id}/`)
      .then((res) => {
        const unit = res.data[0];
        // console.log("unit from rdu", unit);
        dispatch(getUnitSuccess(unit));
      })
      .catch((err) => {
        console.log("error while fetching unit from redu", err);
        dispatch(getUnitFail(err));
      });
  };
};
