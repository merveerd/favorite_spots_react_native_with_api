import {
  USERS_LOADED,
  USERS_FAILED,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  REMOVE_USER_START,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILED,
} from './types';
import firestore from '@react-native-firebase/firestore';

export const getUsers = (params) => {
  return (dispatch) => {
    firestore()
      .collection('Users')
      .get()
      .then((data) => {
        let users = [];
        data._docs.forEach((user) => {
          users.push({...user._data, uid: user.id});
        });
        dispatch({
          type: USERS_LOADED,
          payload: users,
        });
      })
      .catch((err) => {
        console.log('Read Data error: ', err);
        dispatch({
          type: USERS_FAILED,
        });
      });
  };
};
