import React, {useContext, useEffect} from 'react';
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
import Place from './Place';
import {fonts, colors} from '../../style';
const MyFavoriteList = (props) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.blue} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <FlatList
          style={{flex: 1, backgroundColor: 'white'}}
          data={props.myPlaces}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Place data={item} index={index} props={props} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({placeResponse, authResponse}) => {
  const {myPlaces} = placeResponse;
  const {user} = authResponse;
  return {myPlaces, user};
};

export default connect(mapStateToProps, {})(MyFavoriteList);
