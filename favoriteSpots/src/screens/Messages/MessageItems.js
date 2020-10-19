import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import {connect} from 'react-redux';

const MessageItems = (props) => {
  const isWriter = props.data.first_user.username == props.user.username;

  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.navigate('MessageDetails', {data: props.data});
      }}
      style={{
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: 'gray',
      }}>
      <Image
        source={{
          uri: isWriter
            ? props.data.first_user.image
            : props.data.first_user.image,
        }}
        style={{width: 50, height: 50, borderRadius: 25}}
      />

      <View style={{padding: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {props.data.chatName}
        </Text>
        <Text style={{fontSize: 12}}>Son yazilanlardan bi kuble</Text>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = ({authResponse}) => {
  const {user} = authResponse;
  return {user};
};

export default connect(mapStateToProps, {})(MessageItems);
