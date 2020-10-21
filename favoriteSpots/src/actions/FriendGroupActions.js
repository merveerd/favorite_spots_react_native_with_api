import {
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
    let newGroup = {...response}; //id should be in the response, I keep id all the time in redux
    dispatch({
      type: GROUP_ADD_SUCCESS,
      payload: newGroup,
    });
  } else {
    console.log("friend group is not added: ", err);
    dispatch({
      type: GROUP_ADD_FAILED,
    });
  }
};
export const createFriendGroup = (params) => {
  return (dispatch) => {
    //update user friend group
    patch(
      BASE_URL.concat(`/users/${params.userid}`),
      respondCreateFriendGroup,
      dispatch,
      params.friendGroup.id,
    );
    //add in
    post(
      BASE_URL.concat("/friendgroups"),
      respondCreateFriendGroup,
      dispatch,
      params.friendGroup,
    );
  };
};

const respondGetFriendGroup = (response, status, dispatch) => {
  if (status) {
    console.log("respondGetFriendGroup", response); //revise according to the response

    dispatch({
      type: GROUP_GET_SUCCESS,
      payload: response,
    });
  } else {
    dispatch({
      type: GROUP_GET_FAILED,
    });
  }
};
export const getFriendGroups = (param) => {
  return (dispatch) => {
    //param should contain groupIds of the user in array format
    get(
      BASE_URL.concat(`/friendgroups`),
      respondGetFriendGroup,
      dispatch,
      param.groupIds,
    );
  };
};
const respondUpdateFriendGroup = (response, status, dispatch) => {
  if (status) {
    console.log("respondUpdateFriendGroup", response); //revise according to the response

    dispatch({
      type: GROUP_UPDATE_SUCCESS,
      payload: response,
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
    console.log("Read Data error updateFriendGroup: ", response);
  }
};
export const updateFriendGroup = (param) => {
  //param should contain friendgroup id
  patch(
    BASE_URL.concat(`/friendgroups/${param.id}`),
    respondUpdateFriendGroup,
    dispatch,
    param.id,
  );
};
