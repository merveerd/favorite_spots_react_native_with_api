import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {getFriendGroups, startRoom} from '../../actions';

const GetFriendGroups = (props) => {
  useEffect(() => {
    if (props.friendGroups.length === 0) {
      console.log('useEffect friendgroups');
      props.getFriendGroups(props.user);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1, backgroundColor: 'white'}}
        data={props.friendGroups}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('path: ', item.id); //friend group id

                const path = item.id;
                const params = {
                  createdDate: new Date(),
                  first_user: props.user,
                  chatName: item.name,
                  members: [...item.members],
                  path,
                };
                props.startRoom(path, params);
                props.navigation.navigate('MessageDetails', {path});
              }}
              style={{
                flexDirection: 'row',
                margin: 10,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}>
              {
                /* <Image
                                source={{ uri: item.profile_image }}
                                style={{ width: 50, height: 50, borderRadius: 25 }} /> */
                //will be group photo adding option and default image
              }

              <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = {
  text: {padding: 3},
};

const mapStateToProps = ({
  messageResponse,
  authResponse,
  friendGroupResponse,
}) => {
  const {loadingRoom} = messageResponse;
  const {friendGroups} = friendGroupResponse;
  return {loadingRoom, user: authResponse.user, friendGroups};
};

export default connect(mapStateToProps, {getFriendGroups, startRoom})(
  GetFriendGroups,
);
