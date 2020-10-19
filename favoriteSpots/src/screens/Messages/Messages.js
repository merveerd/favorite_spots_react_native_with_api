import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {Fab, Icon} from 'native-base';
import MessageItems from './MessageItems';
import {getRooms} from '../../actions';
import {fonts, colors} from '../../style';
const Messages = (props) => {
  useEffect(() => {
    props.getRooms(props.user.uid);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          data={props.rooms}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return <Text>Herhangi bir mesaj bulunamadı</Text>;
          }}
          renderItem={({item, index}) => (
            <MessageItems data={item} index={index} props={props} />
          )}
        />
      </View>
      <Fab
        containerStyle={{}}
        style={{backgroundColor: colors.somon}}
        position="bottomRight"
        onPress={() => {
          props.navigation.navigate('GetFriendGroups');
        }}>
        <Icon name="plus" type="FontAwesome" style={{color: 'white'}} />
      </Fab>
    </SafeAreaView>
  );
};

const styles = {
  text: {padding: 3},
};

const mapStateToProps = ({messageResponse, authResponse}) => {
  const {loadingRoom, rooms} = messageResponse;
  const {user} = authResponse;
  return {loadingRoom, rooms, user};
};

export default connect(mapStateToProps, {getRooms})(Messages);
