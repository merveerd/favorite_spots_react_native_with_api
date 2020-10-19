import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILED,
  ADD_MESSAGES_START,
  ADD_MESSAGES_SUCCESS,
  ADD_MESSAGES_FAILED,
  GET_ROOM_START,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAILED,
  ADD_ROOM_FAILED,
  ADD_ROOM_START,
  ADD_ROOM_SUCCESS,
} from './types';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import * as RootNavigation from '../RootNavigation';

export const getMessages = (path) => {
  return (dispatch) => {
    dispatch({type: GET_MESSAGES_START});
    firestore()
      .collection('Messages')
      .doc(path)
      .collection('items')
      .orderBy('createdDate', 'desc')
      .onSnapshot((message) => {
        let data = [];
        message.forEach((doc) => {
          data.push(doc.data());
        });
        console.log('message data', data);
        dispatch({type: GET_MESSAGES_SUCCESS, payload: data});
      });
  };
};

export const addMessages = (path, params) => {
  return (dispatch) => {
    dispatch({type: ADD_MESSAGES_START});
    firestore()
      .collection('Messages')
      .doc(path)
      .collection('items')
      .add(params)
      .then((data) => {
        console.log('Message is sent!', data);
        dispatch({type: ADD_MESSAGES_SUCCESS});
      })
      .catch(() => {
        dispatch({type: ADD_MESSAGES_FAILED});
        console.log('Message is not sent!');
      });
  };
};

export const startRoom = (path, params) => {
  return (dispatch) => {
    dispatch({type: ADD_ROOM_START});
    firestore()
      .collection('Messages')
      .doc(path)
      .set(params)
      .then((data) => {
        dispatch({type: ADD_ROOM_SUCCESS}); //as there is a snapshot, dont need to add again via redux
      })
      .catch(() => {
        dispatch({type: ADD_ROOM_FAILED});
        console.log('room havent started!');
      });
  };
};

export const getRooms = (param) => {
  return (dispatch) => {
    dispatch({type: GET_ROOM_START});
    firestore()
      .collection('Messages')
      //.where('members', 'array-contains-any', [param])
      .orderBy('createdDate', 'desc') //updated date can be considered from each room
      .onSnapshot((room) => {
        let data = [];
        room.forEach((doc) => {
          //orderby i burda yap
          data.push(doc.data());
        });
        console.log('gelen room datası: ', data);
        dispatch({type: GET_ROOM_SUCCESS, payload: data});
      });
  };
};
