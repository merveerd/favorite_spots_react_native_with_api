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
} from '../actions/types';

const INITIAL_STATE = {
  loadingRoom: false,
  rooms: [],
  messages: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ROOM_START:
      return {
        ...state,
        loadingRoom: true,
      };
    case GET_ROOM_SUCCESS:
      return {
        ...state,
        loadingRoom: false,
        rooms: action.payload,
      };
    case GET_ROOM_FAILED:
      return {
        ...state,
        loadingRoom: false,
      };
    case GET_MESSAGES_START:
      return {
        ...state,
        loadingRoom: true,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
};
