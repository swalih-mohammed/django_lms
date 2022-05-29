import axios from "axios";
// import { localhost } from "./constants";
import { localhost } from "./urls";

export const authAxios = axios.create({
  //   baseURL: localhost,
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});
