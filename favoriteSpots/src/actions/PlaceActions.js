/*endpoints 
addPersonalPlace users/id  (updated user)
addGroupPlace friendgroups/id (updated friend group)

updatePersonalPlace users/id  (updated user)
*/
import {
  ADD_GROUP_PLACE_START,
  ADD_GROUP_PLACE_SUCCESS,
  ADD_GROUP_PLACE_FAILED,
  GET_GROUP_PLACE_START,
  GET_GROUP_PLACE_SUCCESS,
  GET_GROUP_PLACE_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GROUP_UPDATE_START,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAILED,
  BASE_URL,
} from "./types";
import storage from "@react-native-firebase/storage";
import {Alert} from "react-native";
import {post, get, patch} from "../helpers/APIService";

// export const getGroupPlace = (params) => {
//   return (dispatch) => {
//     dispatch({type: GET_GROUP_PLACE_START});

//     get(
//       BASE_URL + `/friendgroups/manyById`,
//       respondAddGroupPLace,
//       dispatch,
//       params.place,
//     );
//     //params.groupId  params.place will be the place info
//   };
// };

const respondAddGroupPLace = (response, status, dispatch) => {
  if (status) {
    Alert.alert("well done", "Now you have one more common favorite place");
    dispatch({
      type: GROUP_UPDATE_SUCCESS,
      payload: response.data, //response should be the friend group has place addded
    });
  } else {
    dispatch({type: GROUP_UPDATE_FAILED});
  }
};

export const addGroupPlace = (params) => {
  return (dispatch) => {
    dispatch({type: GROUP_UPDATE_START});

    params.friendGroup.places.push(params.place);
    patch(
      BASE_URL + `/friendgroups/${params.friendGroup._id}`,
      respondAddGroupPLace,
      dispatch,
      params.group,
    );
  };
};

const respondAddPersonalPlace = (response, dispatch) => {
  console.log("respondAddPersonalPlace", response.data);
  if (response.status < 400) {
    Alert.alert("well done", "A new favorite place you have");
    dispatch({type: UPDATE_USER_SUCCESS, payload: response.data}); //response will be the user info
  } else {
    dispatch({type: UPDATE_USER_FAILED});
  }
};

const respondAddPlace = (response, dispatch, params) => {
  if (response.status < 400) {
    dispatch({type: UPDATE_USER_START});

    const reference = storage().ref(
      `/users/${params.user._id}/places/${params.place._id}`,
    );
    reference
      .putFile(params.personalPlaceInfo.image)
      .then(() => {
        reference.getDownloadURL().then((imageURL) => {
          const placeRec = {
            _id: params.place._id,
            description: params.personalPlaceInfo.desc,
            photos: [imageURL],
            createdDate: new Date(), //is here because front end state will be shown while it is in session
          };
          const userPlaces = [...params.user.places, placeRec];

          patch(
            BASE_URL + `/users/${params.user._id}`,
            respondAddPersonalPlace,
            dispatch,
            {places: userPlaces},
          );
        });
      })
      .catch((error) => {
        console.log("Image has been not uploaded ", error);
        dispatch({type: UPDATE_USER_FAILED});
      });
  } else {
    dispatch({type: UPDATE_USER_FAILED});
    console.log("The place has been not added!", response);
  }
};

export const addPlace = (params) => {
  return (dispatch) => {
    post(
      BASE_URL + `/places`,
      respondAddPlace,
      dispatch,
      params.place,
      params, //needed for personal info and if the places is already recorded, no place info returns
    );
  };
};

export const removePlace = (params) => {
  return (dispatch) => {};
};
