import {
  GET_PERSONAL_PLACE_START,
  GET_PERSONAL_PLACE_SUCCESS,
  GET_PERSONAL_PLACE_FAILED,
  ADD_PERSONAL_PLACE_START,
  ADD_PERSONAL_PLACE_SUCCESS,
  ADD_PERSONAL_PLACE_FAILED,
  ADD_GROUP_PLACE_START,
  ADD_GROUP_PLACE_SUCCESS,
  ADD_GROUP_PLACE_FAILED,
  GET_GROUP_PLACE_START,
  GET_GROUP_PLACE_SUCCESS,
  GET_GROUP_PLACE_FAILED,
  UPDATE_PERSONAL_PLACE_START,
  UPDATE_PERSONAL_PLACE_SUCCESS,
  UPDATE_PERSONAL_PLACE_FAILED,
  BASE_URL,
} from "./types";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import {Alert} from "react-native";
import {post, get, patch} from "./APIService";
import * as RootNavigation from "../RootNavigation";

// const respondGetMyPlaces = (response, status, dispatch) => {
//   if (status) {
//     let ownPlaces = [];

//     console.log("ownPlaces response", response);
//     // dispatch({
//     //   type: GET_PERSONAL_PLACE_SUCCESS,
//     //   payload: ownPlaces,
//     // });
//   } else {
//     console.log(":ownPlaces ", response);
//     // dispatch({
//     //   type: GET_PERSONAL_PLACE_FAILED,
//     // });
//   }
// };

// export const getMyPlaces = (param) => {
//   return (dispatch) => {
//     // according to individual userId //myfavoritePlaces
//     dispatch({type: GET_PERSONAL_PLACE_START});
//     get(BASE_URL + "/places", respondGetMyPlaces, dispatch, param); // param will be the user places array
//     console.log("getMyPlaces", param);
//   };
// };

const respondAddGroupPLace = (response, status, dispatch) => {
  if (status) {
    Alert.alert("well done", "Now you have one more common favorite place");
    dispatch({
      type: ADD_GROUP_PLACE_SUCCESS,
      payload: response, //response should be the place addded
    });
  } else {
    dispatch({type: ADD_GROUP_PLACE_FAILED});
    console.log("adding place to friend group is failed", response);
  }
};

export const addGroupPlace = (params) => {
  return (dispatch) => {
    dispatch({type: ADD_GROUP_PLACE_START});

    post(
      BASE_URL + `/friendgroups/${params.groupId}`,
      respondAddGroupPLace,
      dispatch,
      params.place,
    );
    //params.groupId  params.place will be the place info
  };
};

const respondAddPersonalPlace = (response, status, dispatch) => {
  if (status) {
    //I assume that the response is user
    dispatch({type: UPDATE_USER_SUCCESS, payload: response}); //response will be the place info
    Alert.alert("well done", "A new favorite place you have");
  } else {
    dispatch({type: UPDATE_USER_FAILEDD});
    console.log("The place has been not added!");
  }
};

export const addPersonalPlace = (params) => {
  return (dispatch) => {
    dispatch({type: UPDATE_USER_START});

    if (params.place.image) {
      //other updates can be considerable later

      reference
        .putFile(params.place.image)
        .then(() => {
          reference.getDownloadURL().then((imageURL) => {
            params.place.image = imageURL;
          });
          params.user.places.push(params.place);
          patch(
            BASE_URL + `/users/${params.user._id}`,
            respondAddPersonalPlace,
            dispatch,
            params.user,
          );
        })
        .catch((error) => {
          console.log("Image has been not uploaded ", error);
          dispatch({type: UPDATE_USER_FAILED});
        });
    } else {
      params.user.places.push(params.place);
      patch(
        BASE_URL + `/users/${params.user._id}`,
        respondAddPersonalPlace,
        dispatch,
        params.user,
      );
    }
  };
};

export const removePlace = (params) => {
  return (dispatch) => {};
};
