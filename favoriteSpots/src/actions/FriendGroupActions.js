import {
  GROUP_ADD_SUCCESS,
  GROUP_ADD_FAILED,
  GROUP_GET_SUCCESS,
  GROUP_GET_FAILED,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAILED,
} from './types';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import * as RootNavigation from '../RootNavigation';
export const createFriendGroup = (params) => {
  console.log('params', params);
  return (dispatch) => {
    firestore()
      .collection('FriendGroups')
      .add(params)
      .then((data) => {
        console.log('friend group is added', data);
        let newGroup = {...params, id: data.id};
        console.log(newGroup);
        dispatch({
          type: GROUP_ADD_SUCCESS,
          payload: newGroup,
        });
      })
      .catch((err) => {
        console.log('friend group is not added: ', err);
        dispatch({
          type: GROUP_ADD_FAILED,
        });
      });
  };
};

export const getFriendGroups = (param) => {
  //ne zaman cagiracagiz
  return (dispatch) => {
    firestore()
      .collection('FriendGroups')
      .where('members', 'array-contains-any', [param.uid]) // //firebase den member property sinde su username var mi diye
      .get()
      .then((data) => {
        console.log('get', data);
        let ownGroups = [];

        data._docs.forEach((group, index) => {
          ownGroups.push({...group._data, id: group._ref.id});
        });
        console.log('ownGroups', ownGroups);
        dispatch({
          type: GROUP_GET_SUCCESS,
          payload: ownGroups,
        });
      })
      .catch((err) => {
        console.log('Read Data error: ', err);
        dispatch({
          type: GROUP_GET_FAILED,
        });
      });
  };
};

export const updateFriendGroup = (param) => {
  //param will be updated group
  //ne zaman cagiracagiz
  console.log('updateFriendGroup', param);
  return (dispatch) => {
    firestore()
      .collection('FriendGroups')
      .doc(param.id)
      .set(param)
      .then((data) => {
        console.log('update', data);
        dispatch({
          type: GROUP_UPDATE_SUCCESS,
          payload: param,
        });
        Alert.alert(
          'Good!',
          'You added your friend to the hub!',
          [
            {
              text: 'Nice',
              onPress: () => RootNavigation.pop(),
            },
          ],
          {
            cancelable: false,
          },
        );
      })
      .catch((err) => {
        console.log('Read Data error: ', err);
        dispatch({
          type: GROUP_UPDATE_FAILED,
        });
      });
  };
};
