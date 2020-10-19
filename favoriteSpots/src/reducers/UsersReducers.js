import {
  USERS_LOADED,
  USERS_FAILED,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  REMOVE_USER_START,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILED,
  RESET_USERS,
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  loadingUser: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_LOADED:
      return {
        ...state,
        users: [...action.payload], //send the object accordingly
      };

    case USERS_FAILED: //there can be back up to handle this situation on actions
      return {
        ...state,
      };

    case ADD_USER_SUCCESS: //when registration happens
      return {
        ...state,
      };

    case ADD_USER_FAILED:
      return {
        ...state,
      };

    case REMOVE_USER_START:
      return {
        ...state,
        loadingUser: true, //deleting account
      };

    case REMOVE_USER_SUCCESS:
      const id = action.payload;
      const newData = state.users.filter((dt) => dt.id != id); //should be revised
      return {
        ...state,
        loadingUser: false,
        users: newData,
      };

    case REMOVE_USER_FAILED:
      return {
        ...state,
        loadingUser: false,
      };

    case RESET_USERS:
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};
