import {combineReducers} from "redux";
import PlaceReducers from "./PlaceReducers";
import AuthReducers from "./AuthReducers";
import FriendGroupReducers from "./FriendGroupReducers";
import MessageReducers from "./MessageReducers";
export default combineReducers({
  placeResponse: PlaceReducers,
  authResponse: AuthReducers,
  friendGroupResponse: FriendGroupReducers,
  messageResponse: MessageReducers,
});
