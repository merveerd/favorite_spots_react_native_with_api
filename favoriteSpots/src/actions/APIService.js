const axios = require("axios");
import AsyncStorage from "@react-native-community/async-storage";
//import * as Keychain from "react-native-keychain";
import {LOCAL_AUTH_ID} from "./types";

export const get = async (
  requestMethod,
  callbackFn,
  dispatch,
  requestParams,
) => {
  // const credentials = await Keychain.getGenericPassword();
  let token1 = await AsyncStorage.getItem(LOCAL_AUTH_ID);
  console.log("token", token1);
  return axios
    .request({
      method: "GET",
      url: requestMethod,
      // data: requestParams ? requestParams : null, //check if it is working
      responseType: "json",
      headers: {
        authorization: "Bearer ".concat(token1),
      },
    })
    .then((response) => {
      console.log("response get", requestMethod, response);
      if (response.status < 400) {
        callbackFn(response, true, dispatch);
      } else {
        console.log("responses other than 201", response);
        callbackFn(response, false, dispatch);
      }
    })
    .catch((e) => {
      console.log("err get", requestMethod);
      console.log(e);
      callbackFn(e, false, dispatch);
    });
};

export const post = async (
  requestMethod,
  callbackFn,
  dispatch,
  requestParams,
) => {
  // const credentials = await Keychain.getGenericPassword();
  let token1 = await AsyncStorage.getItem(LOCAL_AUTH_ID);
  return axios
    .request({
      method: "POST",
      url: requestMethod,
      responseType: "json",
      data: requestParams,
      headers: {
        authorization: "Bearer ".concat(token1),
      },
    })
    .then((response) => {
      console.log("response post", requestMethod, response);
      if (response.status < 400) {
        callbackFn(response, true, dispatch);
      } else {
        callbackFn(response, false, dispatch);
      }
    })
    .catch((e) => {
      console.log("err post", requestMethod, e.message);
      callbackFn(e, false, dispatch);
    });
};

export const patch = async (
  requestMethod,
  callbackFn,
  dispatch,
  requestParams,
) => {
  //const credentials = await Keychain.getGenericPassword();
  let token1 = await AsyncStorage.getItem(LOCAL_AUTH_ID);
  return axios
    .request({
      method: "PATCH",
      url: requestMethod,
      responseType: "json",
      data: requestParams,
      headers: {
        authorization: "Bearer ".concat(token1),
      },
    })
    .then((response) => {
      console.log("response patch", requestMethod, response);
      if (response.status < 400) {
        callbackFn(response, true, dispatch);
      } else {
        callbackFn(response, false, dispatch);
      }
    })
    .catch((e) => {
      console.log("err patch", requestMethod, e.message);
      callbackFn(e, false, dispatch);
    });
};

export const deleteOne = async (
  requestMethod,
  callbackFn,
  dispatch,
  requestParams,
) => {
  //const credentials = await Keychain.getGenericPassword();
  let token1 = await AsyncStorage.getItem(LOCAL_AUTH_ID);
  return axios
    .delete(requestMethod, {
      headers: {
        authorization: "Bearer ".concat(token1),
      },
      data: requestParams,
    })
    .then((response) => {
      console.log("response delete", requestMethod, response);
      if (response.status < 400) {
        callbackFn(response, true, dispatch);
      } else {
        callbackFn(response, false, dispatch);
      }
    })
    .catch((e) => {
      callbackFn(e, false, dispatch);
    });
};
