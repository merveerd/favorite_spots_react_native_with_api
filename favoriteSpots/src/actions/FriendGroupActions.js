import {
  GROUP_START,
  GROUP_ADD_SUCCESS,
  GROUP_ADD_FAILED,
  GROUP_GET_SUCCESS,
  GROUP_GET_FAILED,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAILED,
  BASE_URL,
} from "./types";

import {Alert} from "react-native";
import {post, get, patch} from "./APIService";
import * as RootNavigation from "../RootNavigation";

const respondCreateFriendGroup = (response, status, dispatch) => {
  if (status) {
    Alert.alert("Good!", "You have started something!");
    let newGroup = {...response.data};
    dispatch({
      type: GROUP_ADD_SUCCESS,
      payload: newGroup,
    });
  } else {
    console.log("friend group has not been added: ", err);
    dispatch({
      type: GROUP_ADD_FAILED,
    });
  }
};
export const createFriendGroup = (params) => {
  return (dispatch) => {
    dispatch({type: GROUP_START});
    //add in
    post(
      BASE_URL.concat("/friendgroups"),
      respondCreateFriendGroup,
      dispatch,
      params,
    );
  };
};

const respondGetFriendGroup = (response, status, dispatch) => {
  if (status) {
    dispatch({
      type: GROUP_GET_SUCCESS,
      payload: response.data,
    });
  } else {
    dispatch({
      type: GROUP_GET_FAILED,
    });
  }
};
export const getFriendGroups = (param) => {
  return (dispatch) => {
    dispatch({type: GROUP_START});
    //param should contain groupIds of the user in array format
    get(
      BASE_URL.concat(`/friendgroups/byUserId/${param.id}`),
      respondGetFriendGroup,
      dispatch,
      param,
    );
  };
};
const respondUpdateFriendGroup = (response, status, dispatch) => {
  if (status) {
    dispatch({
      type: GROUP_UPDATE_SUCCESS,
      payload: response.data,
    });

    Alert.alert(
      "Good!",
      "You added your friend to the hub!",
      [
        {
          text: "Nice",
          onPress: () => RootNavigation.pop(),
        },
      ],
      {
        cancelable: false,
      },
    );
  } else {
    dispatch({
      type: GROUP_UPDATE_FAILED,
    });
    console.log("Error on updateFriendGroup: ", response);
  }
};

export const updateFriendGroup = (param) => {
  //param should contain friendgroup id
  return (dispatch) => {
    dispatch({type: GROUP_START});
    patch(
      BASE_URL.concat(`/friendgroups/${param._id}`),
      respondUpdateFriendGroup,
      dispatch,
      param,
    );
  };
};
