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
} from "./types";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import {Alert} from "react-native";
import * as RootNavigation from "../RootNavigation";

export const getMyPlaces = (param) => {
  return (dispatch) => {
    // according to individual userId //myfavoritePlaces
    console.log("getMyPlaces", param);
    dispatch({type: GET_PERSONAL_PLACE_START});
    firestore()
      .collection("Places")
      .orderBy("createdDate", "desc")
      .where("user", "==", param) //params will be the user Id
      .get()
      .then((data) => {
        console.log("get", data);

        let ownPlaces = [];

        data._docs.forEach((group, index) => {
          ownPlaces.push({...group._data, id: group._ref.id}); //check ref.id
        });
        console.log("ownPlaces", ownPlaces);
        dispatch({
          type: GET_PERSONAL_PLACE_SUCCESS,
          payload: ownPlaces,
        });
      })
      .catch((err) => {
        console.log("Read Data error: ", err);
        dispatch({
          type: GET_PERSONAL_PLACE_FAILED,
        });
      });
  };
};

export const getFriendGroupsPlaces = (params) => {
  //should be listened with snapshot
  return (dispatch) => {
    dispatch({type: GET_GROUP_PLACE_START});
    firestore()
      .collection("Places")
      .where("friendGroups", "array-contains-any", [params.id])
      .get()
      .then((data) => {
        let groupPlaces = [];
        data._docs.forEach((item) => {
          groupPlaces.push(item._data);
        });
        dispatch({type: GET_GROUP_PLACE_SUCCESS, payload: groupPlaces});
      })
      .catch(() => {
        dispatch({type: GET_GROUP_PLACE_FAILED});
        console.log("Couldnt get the places!");
      });
  };
};

export const addGroupPlace = (params) => {
  return (dispatch) => {
    dispatch({type: UPDATE_PERSONAL_PLACE_START});
    firestore()
      .collection("Places")
      .doc(params.placeId)
      .update({
        friendGroups: firestore.FieldValue.arrayUnion(
          `${params.friendGroupId}`,
        ),
      })
      .then((data) => {
        Alert.alert("well done", "Now you have one more common favorite place");
        dispatch({
          type: UPDATE_PERSONAL_PLACE_SUCCESS,
          payload: params,
        });
      })
      .catch(() => {
        dispatch({type: UPDATE_PERSONAL_PLACE_FAILED});
      });
  };
};

export const addPersonalPlace = (params) => {
  return (dispatch) => {
    dispatch({type: ADD_PERSONAL_PLACE_START});
    firestore()
      .collection("Places")
      .add(params)
      .then((data) => {
        let placeId = data.id;

        if (params.image) {
          const reference = storage().ref(`/places/${placeId}`);
          console.log("params.image", params.image);
          reference
            .putFile(params.image)
            .then(() => {
              reference.getDownloadURL().then((imageURL) => {
                firestore()
                  .collection("Places")
                  .doc(placeId)
                  .update({image: imageURL})
                  .then(() => {
                    let newPlace = {...params, id: placeId};
                    dispatch({
                      type: ADD_PERSONAL_PLACE_SUCCESS,
                      payload: newPlace,
                    });
                    Alert.alert(
                      "well done",
                      "A new favorite place you have now",
                    );
                  });
              });
            })
            .catch((error) => {
              console.log("Image loading error ", error);
            });
        } else {
          dispatch({type: ADD_PERSONAL_PLACE_SUCCESS, payload: params});
          Alert.alert("well done", "A new favorite place you have now");
        }
      })
      .catch(() => {
        dispatch({type: ADD_PERSONAL_PLACE_FAILED});
        console.log("Place hasnt been added!");
      });
  };
};

export const removePlace = (params) => {
  return (dispatch) => {};
};
