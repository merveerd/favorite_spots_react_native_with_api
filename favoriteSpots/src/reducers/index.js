import {combineReducers} from 'redux';
import PlaceReducers from './PlaceReducers';
import AuthReducers from './AuthReducers';
import UsersReducers from './UsersReducers';
import FriendGroupReducers from './FriendGroupReducers';
import MessageReducers from './MessageReducers';
export default combineReducers({
  placeResponse: PlaceReducers,
  authResponse: AuthReducers,
  usersResponse: UsersReducers,
  friendGroupResponse: FriendGroupReducers,
  messageResponse: MessageReducers,
});
