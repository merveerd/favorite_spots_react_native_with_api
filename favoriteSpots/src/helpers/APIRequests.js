const axios = require("axios");
import {
  USERS_LOADING_START,
  USERS_LOADED,
  USERS_FAILED,
  BASE_URL,
} from "../actions/types";

import {post} from "./APIService";

const respondGetUsers = async (response) => {
  if (response.status < 400) {
    return response.data;
  } else {
    console.log("error respondGetUsers: ", response);
  }
};
export const getUsers = async (params) => {
  return await post(BASE_URL + "/users/", respondGetUsers, null, params);
};
