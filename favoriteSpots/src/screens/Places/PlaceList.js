import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import getUsers from '../../actions';
const PlaceList = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Text
          onPress={() => {
            props.getUsers();
          }}>
          All places myPlaces in your friends groups and yours, search bar for
          tag search or place real name search
        </Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({placeResponse}) => {
  const {myPlaces} = placeResponse;
  return {myPlaces};
};

export default connect(mapStateToProps, {getUsers})(PlaceList);
