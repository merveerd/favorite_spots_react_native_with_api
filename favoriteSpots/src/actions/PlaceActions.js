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
    console.log("group place", params.place);
    params.friendGroup.places.push(params.place);
    patch(
      BASE_URL + `/friendgroups/${params.friendGroup._id}`,
      respondAddGroupPLace,
      dispatch,
      params.group,
    );
  };
};

const respondAddPersonalPlace = (response, status, dispatch) => {
  if (status) {
    //I assume that the response is user
    console.log("respondAddPersonalPlace ", response);

    const newImage =
      response.data.places[response.data.places.length - 1].image;
    if (newImage.slice(0, 11) !== "https://fir") {
      //if it is not already recorded in firebase. there can be another structure without controlling string
      console.log(
        `/users/${response.data._id}/places/${
          response.data.places[response.data.places.length - 1]._id
        }`,
      );
      const reference = storage().ref(
        `/users/${response.data._id}/places/${
          response.data.places[response.data.places.length - 1]._id
        }`,
      );

      reference
        .putFile(newImage)
        .then(() => {
          reference.getDownloadURL().then((imageURL) => {
            response.data.places[
              response.data.places.length - 1
            ].image = imageURL;

            patch(
              BASE_URL + `/users/${response.data._id}`,
              respondAddPersonalPlace,
              dispatch,
              response.data, //updated user will be patched
            );
          });
        })
        .catch((error) => {
          console.log("Image has been not uploaded ", error);
          dispatch({type: UPDATE_USER_FAILED});
        });
    } else {
      dispatch({type: UPDATE_USER_SUCCESS, payload: response.data}); //response will be the user info
      Alert.alert("well done", "A new favorite place you have");
    }
  } else {
    dispatch({type: UPDATE_USER_FAILED});
    console.log("The place has been not added!", response);
  }
};

export const addPersonalPlace = (params) => {
  return (dispatch) => {
    dispatch({type: UPDATE_USER_START});
    params.user.places.push(params.place);

    patch(
      BASE_URL + `/users/${params.user._id}`,
      respondAddPersonalPlace,
      dispatch,
      params.user, //updated user will be patched
    );
  };
};

export const removePlace = (params) => {
  return (dispatch) => {};
};
