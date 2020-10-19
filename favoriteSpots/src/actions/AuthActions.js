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
} from './types';

import {Alert} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const login = (params) => {
  return (dispatch) => {
    if (params.email != '' && params.password != '') {
      if (validateEmail(params.email)) {
        dispatch({
          type: LOGIN_START,
        });

        auth()
          .signInWithEmailAndPassword(params.email, params.password)
          .then((data) => {
            const uid = data.user._user.uid;

            // read user from db
            firestore()
              .collection('Users')
              .doc(uid)
              .get()
              .then((user) => {
                const userParams = {
                  ...user._data,
                  uid,
                };
                console.log('login', userParams);
                dispatch({
                  type: LOGIN_SUCCESS,
                  payload: userParams,
                });
              })
              .catch((err) => {
                console.log('Read Data error: ', err);
                dispatch({
                  type: LOGIN_FAILED,
                });
              });
          })
          .catch((error) => {
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            } else if (error.code === 'auth/user-not-found') {
              console.log('That email address is invalid!');
              Alert.alert('Uyarı', 'Böyle bir kullanıcı bulunamadı!');
            }
            console.log('error came');
            console.log(error.code);
            dispatch({
              type: LOGIN_FAILED,
            });
          });
      } else {
        Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!');
      }
    } else {
      Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!');
    }
  };
};
export const updateUserProfile = (params) => {
  return (dispatch) => {
    dispatch({type: UPDATE_USER_START});
    if (params.image) {
      let userId = params.uid;
      const reference = storage().ref(`/users/${userId}`);
      console.log('params.image', params.image);
      reference
        .putFile(params.image)
        .then(() => {
          reference.getDownloadURL().then((imageURL) => {
            firestore()
              .collection('Users')
              .doc(userId)
              .update({image: imageURL})
              .then(() => {
                let updatedUser = {...params, image: imageURL};
                console.log('updateUser', updatedUser);
                dispatch({
                  type: UPDATE_USER_SUCCESS,
                  payload: updatedUser,
                });
                Alert.alert('updated', 'Your profile image is updated!');
              });
          });
        })
        .catch((error) => {
          console.log('Image loading error ', error);
        });
    } else {
      dispatch({type: UPDATE_USER_SUCCESS, payload: params});
      Alert.alert('updated', 'Your profile image is updated!');
    }
  };
};

export const signUp = (params) => {
  return (dispatch) => {
    if (
      params.email != '' &&
      params.password != '' &&
      params.name != '' &&
      params.username != ''
    ) {
      if (validateEmail(params.email)) {
        firestore()
          .collection('Users')
          .where('username', '==', params.username)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              auth()
                .createUserWithEmailAndPassword(params.email, params.password)
                .then((data) => {
                  const uid = data.user._user.uid;
                  // write user from db
                  const setData = {
                    name: params.name,
                    username: params.username,
                    email: params.email,
                  };
                  firestore()
                    .collection('Users')
                    .doc(uid) //unique Id given here
                    .set(setData)
                    .then(() => {
                      console.log('User is created!');
                      Alert.alert(
                        'Got it',
                        'Your account has been created!',
                        [
                          {
                            text: 'OK',
                            onPress: () => RootNavigation.pop(),
                          },
                        ],
                        {
                          cancelable: false,
                        },
                      );
                    })
                    .catch(() => {
                      console.log('User is not created!');
                    });
                })
                .catch((error) => {
                  if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                      'Warning',
                      'That email address is already in use!!',
                    );
                  }
                });
            } else {
              Alert.alert('Warning', 'That username is already in use!!');
            }
          });
      } else {
        Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!');
      }
    } else {
      Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!');
    }
  };
};

export const isUser = () => {
  return (dispatch) => {
    auth().onAuthStateChanged((user) => {
      console.log('Is user:', user);
      if (user) {
        const uid = user._user.uid;
        getUser(uid, dispatch);
      } else {
        console.log('no user');
        dispatch({type: LOGIN_FAILED});
      }
    });
  };
};

const getUser = (uid, dispatch) => {
  // read user from db
  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then((user) => {
      const userParams = {
        ...user._data,
        uid,
      };
      console.log('user info', userParams);
      dispatch({type: LOGIN_SUCCESS, payload: userParams});
    })
    .catch((err) => {
      console.log('Read Data error: ', err);
      dispatch({type: LOGIN_FAILED});
    });
};

export const signOut = () => {
  return (dispatch) => {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: SIGN_OUT_SUCCESS});
        dispatch({type: RESET_USERS});
        dispatch({type: RESET_PLACES});
        dispatch({type: RESET_FRIEND_GROUPS});
      });
    //  RootNavigation.replace('Entrance');
  };
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
