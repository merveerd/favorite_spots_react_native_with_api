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
import {post, get, patch} from "./APIService";

const respondAddGroupPLace = (response, status, dispatch) => {
  if (status) {
    Alert.alert("well done", "Now you have one more common favorite place");
    dispatch({
      type: GROUP_UPDATE_SUCCESS,
      payload: response, //response should be the place addded
    });
  } else {
    dispatch({type: GROUP_UPDATE_FAILED});
  }
};

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

export const addGroupPlace = (params) => {
  return (dispatch) => {
    dispatch({type: GROUP_UPDATE_START});

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
    dispatch({type: UPDATE_USER_SUCCESS, payload: response.data}); //response will be the user info
    Alert.alert("well done", "A new favorite place you have");
  } else {
    dispatch({type: UPDATE_USER_FAILEDD});
    console.log("The place has been not added!", response);
  }
};

export const addPersonalPlace = (params) => {
  return (dispatch) => {
    dispatch({type: UPDATE_USER_START});
    if (params.place.image) {
      //other updates can be considerable later
      const reference = storage().ref(`/users/${params.user._id}/places/`); //supposed to be placeId otherwise it overrides on the current place image
      reference
        .putFile(params.place.image)
        .then(() => {
          reference.getDownloadURL().then((imageURL) => {
            params.place.image = imageURL;

            params.user.places.push(params.place);
            patch(
              BASE_URL + `/users/${params.user._id}`,
              respondAddPersonalPlace,
              dispatch,
              params.user, //updated user will be patched
            );
          });
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
