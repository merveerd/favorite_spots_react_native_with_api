import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from '../../actions';

const Settings = (props) => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity //wanted to show on top bar but we cant use authContext method in Router as it will be undefined for now
          onPress={() => {
            props.signOut();
          }}
          style={{
            marginRight: 20,
          }}>
          <Text style={{fontSize: fonts.small}}> Sign out </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({placeResponse}) => {
  const {myPlaces} = placeResponse;
  return {myPlaces};
};

export default connect(mapStateToProps, {signOut})(Settings);
