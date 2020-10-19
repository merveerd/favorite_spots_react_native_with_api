import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

const SearchResults = (props) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Searcdh results</Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({placeResponse}) => {
  const {myPlaces} = placeResponse;
  return {myPlaces};
};

export default connect(mapStateToProps, {})(SearchResults);
