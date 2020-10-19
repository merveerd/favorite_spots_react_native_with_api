import {
  GET_PERSONAL_PLACE_START,
  GET_PERSONAL_PLACE_SUCCESS,
  GET_PERSONAL_PLACE_FAILED,
  ADD_PERSONAL_PLACE_START,
  ADD_PERSONAL_PLACE_SUCCESS,
  ADD_PERSONAL_PLACE_FAILED,
  UPDATE_PERSONAL_PLACE_START,
  UPDATE_PERSONAL_PLACE_SUCCESS,
  UPDATE_PERSONAL_PLACE_FAILED,
  ADD_GROUP_PLACE_START,
  ADD_GROUP_PLACE_SUCCESS,
  ADD_GROUP_PLACE_FAILED,
  GET_GROUP_PLACE_START,
  GET_GROUP_PLACE_SUCCESS,
  GET_GROUP_PLACE_FAILED,
  RESET_PLACES,
} from '../actions/types';

const INITIAL_STATE = {
  loadingList: false,
  myPlaces: [],
  myGroupPlaces: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PERSONAL_PLACE_START:
      return {
        ...state,
        loadingList: true,
      };

    case ADD_PERSONAL_PLACE_SUCCESS:
      return {
        ...state,
        myPlaces: [action.payload, ...state.myPlaces],
        loadingList: false,
      };
    case ADD_PERSONAL_PLACE_FAILED:
      return {
        ...state,
        loadingList: false,
      };
    case UPDATE_PERSONAL_PLACE_START:
      return {
        ...state,
        loadingList: true,
      };

    case UPDATE_PERSONAL_PLACE_SUCCESS:
      const updatingObj = action.payload;

      let arrUpdating = state.myPlaces.slice();

      let updatingIndex = arrUpdating.findIndex(
        (item) => updatingObj.placeId === item.id,
      );
      let updatedPlace;
      if (updatingIndex !== -1) {
        if (arrUpdating[updatingIndex].friendGroups) {
          console.log(
            'mevcut friend group',
            arrUpdating[updatingIndex].friendGroups,
          );

          updatedPlace = arrUpdating[updatingIndex].friendGroups.push(
            updatingObj.friendGroupId,
          );
          console.log('pustan sonra', arrUpdating);
        } else {
          console.log('else no friend group place');
          arrUpdating[updatingIndex].friendGroups = [updatingObj.friendGroupId];
        }
      } else {
        console.log('no recorded place with this id');
      }
      return {
        ...state,
        myPlaces: arrUpdating,
        loadingList: false,
      };
    case UPDATE_PERSONAL_PLACE_FAILED:
      return {
        ...state,
        loadingList: false,
      };

    case ADD_GROUP_PLACE_START:
      return {
        ...state,
        loadingList: true,
      };

    case ADD_GROUP_PLACE_SUCCESS:
      return {
        ...state,
        myGroupPlaces: [action.payload, ...state.myGroupPlaces],
        loadingList: false,
      };
    case ADD_GROUP_PLACE_FAILED:
      return {
        ...state,
        loadingList: false,
      };
    case GET_PERSONAL_PLACE_START:
      return {
        ...state,
        loadingList: true,
      };

    case GET_PERSONAL_PLACE_SUCCESS:
      return {
        ...state,
        loadingList: false,
        myPlaces: action.payload,
      };

    case GET_PERSONAL_PLACE_FAILED:
      return {
        ...state,
        loadingList: false,
      };
    case GET_GROUP_PLACE_START:
      return {
        ...state,
        loadingList: true,
      };

    case GET_GROUP_PLACE_SUCCESS:
      return {
        ...state,
        loadingList: false,
        myGroupPlaces: action.payload,
      };

    case GET_GROUP_PLACE_FAILED:
      return {
        ...state,
        loadingList: false,
      };

    case RESET_PLACES:
      console.log(RESET_PLACES);
      return {
        ...state,
        myPlaces: [],
        myGroupPlaces: [],
      };
    default:
      return state;
  }
};
