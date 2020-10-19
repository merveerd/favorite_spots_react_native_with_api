import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';

import {Input, Button} from '../../components';

import {getMessages, addMessages} from '../../actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import {colors, fonts} from '../../style';
const {width} = Dimensions.get('window');

const MessageDetails = (props) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('props value: ', props.route.params);
    props.getMessages(props.route.params.data.path);
    //return updateDate function and last message
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={MessageStyle.container}>
        <View style={MessageStyle.messageListContainer}>
          <FlatList
            data={props.messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              console.log('Liste gelen: ', item);
              let isMe = props.user.username == item.sender.username;

              const user_name = !isMe ? item.sender.name : '';

              return (
                <View
                  style={[
                    MessageStyle.messageItemContainer,
                    {justifyContent: isMe ? 'flex-end' : 'flex-start'},
                  ]}>
                  {isMe ? null : (
                    <View style={MessageStyle.profileCircle}>
                      <Text style={{color: 'black', fontSize: fonts.small}}>
                        {user_name}
                      </Text>
                    </View>
                  )}
                  <View
                    style={[
                      {
                        backgroundColor: isMe ? colors.blue : colors.somon,
                        width: item.text.length > 40 ? width - 100 : null,
                      },
                      MessageStyle.bubleStyle,
                    ]}>
                    <Text style={{color: 'white'}}>{item.text}</Text>
                  </View>
                </View>
              );
            }}
            inverted
          />
        </View>

        <View style={MessageStyle.inputContainerStyle}>
          <Input
            placeholder="write a message..."
            style={{flex: 1, height: 30, padding: 5, borderBottomWidth: 0}}
            value={message}
            maxLength={100}
            onChangeText={(text) => setMessage(text)}
            multiline
          />
          <TouchableOpacity
            onPress={() => {
              console.log('members', props.route.params.data.members);
              const params = {
                text: message,
                createdDate: new Date(),
                receivers: props.route.params.data.members,
                sender: props.user,
              };
              props.addMessages(props.route.params.data.path, params);
              setMessage('');
            }}
            style={{marginBottom: 10}}>
            <Icon name="send" type="FontAwesome" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const MessageStyle = {
  container: {flex: 1},
  inputContainerStyle: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.somon,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  messageListContainer: {flex: 15, backgroundColor: 'white'},
  inputStyle: {width: width - 110, height: 50},
  sendButtonStyle: {width: width / 7, height: width / 7},
  messageItemContainer: {padding: 10, flexDirection: 'row'},
  profileCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.somon,
  },
  bubleStyle: {marginLeft: 20, padding: 10, borderRadius: 10},
};

const mapStateToProps = ({
  authResponse,
  friendGroupResponse,
  messageResponse,
}) => {
  const {messages} = messageResponse;
  const {user} = authResponse;
  const {friendGroups} = friendGroupResponse;
  return {user, friendGroups, messages};
};

export default connect(mapStateToProps, {getMessages, addMessages})(
  MessageDetails,
);
