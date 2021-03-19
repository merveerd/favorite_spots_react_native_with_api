import {
  GROUP_START,
  GROUP_GET_SUCCESS,
  GROUP_GET_FAILED,
  GROUP_ADD_SUCCESS,
  GROUP_ADD_FAILED,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAILED,
} from "../actions/types";

const INITIAL_STATE = {
  friendGroups: [], //personal friend groups
  loadingFriendGroups: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_START:
      return {
        ...state,
        loadingFriendGroups: true,
      };

    case GROUP_GET_SUCCESS:
      return {
        ...state,
        friendGroups: [...action.payload],
      };
    case GROUP_GET_FAILED:
      return {
        ...state,
      };

    case GROUP_ADD_SUCCESS:
      const newGroup = action.payload; //send the object accordingly
      return {
        ...state,
        friendGroups: [...state.friendGroups, newGroup], //will be in the front end just for the person who is in session. as that person will be in that group in any condition
      };

    case GROUP_ADD_FAILED: //there can be back up to handle this situation on actions
      return {
        ...state,
      };

    case GROUP_UPDATE_SUCCESS:
      const updatedGroup = action.payload;
      let arrUpdating = state.friendGroups.slice();
      const updateIndex = state.friendGroups.findIndex(
        (group) => group.name === action.payload.name,
      );
      arrUpdating.splice(updateIndex, 1, updatedGroup);

      return {
        ...state,
        friendGroups: arrUpdating, //will be in the front end just for the person who is in session. as that person will be in that group in any condition
        loadingFriendGroups: false,
      };

    case GROUP_UPDATE_FAILED: //there can be back up to handle this situation on actions
      return {
        ...state,
        loadingFriendGroups: false,
      };

    default:
      return state;
  }
};
