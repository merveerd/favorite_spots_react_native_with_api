import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import AsyncStorage from "@react-native-community/async-storage";
import * as Keychain from "react-native-keychain";

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGN_OUT_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  RESET_USERS,
  RESET_PLACES,
  RESET_FRIEND_GROUPS,
  BASE_URL,
  LOCAL_AUTH_ID,
  USER,
} from "./types";

import {Alert} from "react-native";
import {post, get, patch} from "./APIService";
import * as RootNavigation from "../RootNavigation";

const respondLoginAction = async (response, status, dispatch) => {
  if (status) {
    console.log("respondLoginAction", response.data.user);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.user,
    });

    // RootNavigation.replace("Home");

    USER.token = response.data.token;

    // await Keychain.setGenericPassword(LOCAL_AUTH_ID, response.data.token);
    // const credentials = Keychain.getGenericPassword();
    //console.log("credentials", credentials);
    AsyncStorage.setItem(LOCAL_AUTH_ID, response.data.token);
    let token = await AsyncStorage.getItem(LOCAL_AUTH_ID);
    console.log("async token setted", token);
  } else {
    console.log("Gelen POST Hatalı respondLoginAction: => ", response);
    Alert.alert("WARNING", "Something bad happened!");
    dispatch({type: LOGIN_FAILED});
  }
};

export const signUp = (params) => {
  return (dispatch) => {
    if (
      params.email != "" &&
      params.password != "" &&
      params.name != "" &&
      params.username != ""
    ) {
      if (validateEmail(params.email)) {
        dispatch({type: LOGIN_START});
        AsyncStorage.removeItem(LOCAL_AUTH_ID);
        post(BASE_URL.concat("/signup"), respondLoginAction, dispatch, params);
      } else {
        Alert.alert("WARNING", "Please enter a valid email address");
      }
    } else {
      Alert.alert("WARNING", "Please fill out the all fields");
    }
  };
};

export const login = (params) => {
  return (dispatch) => {
    if (params.email != "" && params.password != "") {
      if (validateEmail(params.email)) {
        dispatch({
          type: LOGIN_START,
        });

        post(BASE_URL.concat("/signin"), respondLoginAction, dispatch, params);
      } else {
        Alert.alert("WARNING", "Please enter a valid email address");
      }
    } else {
      Alert.alert("WARNING", "Please fill out the all fields");
    }
  };
};

const respondUpdateUser = (response, status, dispatch) => {
  if (status) {
    console.log("respondUpdateUser", response.data);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });

    Alert.alert("updated", "Your profile image is updated!");
  } else {
    console.log("Gelen POST Hatalı respondUpdateUser: => ", response);
    Alert.alert("WARNING", "Something bad happened!");
    dispatch({type: LOGIN_FAILED});
  }
};

export const updateUserProfile = (params) => {
  return (dispatch) => {
    dispatch({type: UPDATE_USER_START});
    if (params.image) {
      let userId = params.id;
      const reference = storage().ref(`/users/${userId}`); //still using the firebase for image storage

      reference
        .putFile(params.image)
        .then(() => {
          reference.getDownloadURL().then((imageURL) => {
            patch(
              BASE_URL.concat(`/users/${userId}`),
              respondUpdateUser,
              dispatch,
              {image: imageURL},
            );
          });
        })
        .catch((error) => {
          console.log("Image loading error ", error);
        });
    }
  };
};

const getUser = (response, status, dispatch) => {
  if (status) {
    console.log(response);
    dispatch({type: LOGIN_SUCCESS, payload: response.data.user});
  } else {
    console.log("Read Data error get User: ", response);
    dispatch({type: LOGIN_FAILED});
  }
};

export const isUser = () => {
  return (dispatch) => {
    dispatch({type: LOGIN_START});
    get(BASE_URL, getUser, dispatch);
  };
};

export const signOut = () => {
  return (dispatch) => {
    // Keychain.resetGenericPassword();
    AsyncStorage.removeItem(LOCAL_AUTH_ID);
    USER.token = null;

    dispatch({type: SIGN_OUT_SUCCESS});
    dispatch({type: RESET_USERS});
    dispatch({type: RESET_PLACES});
    dispatch({type: RESET_FRIEND_GROUPS});

    //  RootNavigation.replace('Entrance');
  };
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
