import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Header} from '../../components';
const FriendGroupDetails = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Header />
        <Text>
          message button, their favorite places(tags and who added will be shown
          for each) maybe one last photo from there
        </Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({placeResponse}) => {
  const {myPlaces} = placeResponse;
  return {myPlaces};
};

export default connect(mapStateToProps, {})(FriendGroupDetails);
