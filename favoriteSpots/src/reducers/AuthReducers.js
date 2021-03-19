import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGN_OUT_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  REMOVE_USER_START,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILED,
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
      };

    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload, //will be in the front end just for the person who is in session. as that person will be in that group in any condition
      };

    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
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

    default:
      return state;
  }
};
