import {
  USERS_LOADING_START,
  USERS_LOADED,
  USERS_FAILED,
  BASE_URL,
} from "./types";

import {post} from "./APIService";

const respondGetUsers = (response, status, dispatch) => {
  if (status) {
    dispatch({
      type: USERS_LOADED,
      payload: response.data,
    });
  } else {
    console.log("error respondGetUsers: ", response);
    dispatch({
      type: USERS_FAILED,
    });
  }
};
export const getUsers = (params) => {
  return (dispatch) => {
    dispatch({type: USERS_LOADING_START});
    post(BASE_URL + "/users/", respondGetUsers, dispatch, params);
  };
};
