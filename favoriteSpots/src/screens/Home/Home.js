import React, {useContext, useEffect, useState} from "react";
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import {connect} from "react-redux";
import Place from "../Places/Place";
import {getFriendGroups} from "../../actions";
//import {AuthContext} from '../../context';
import {fonts, colors} from "../../style";
const Home = (props) => {
  useEffect(() => {
    console.log("home", props.user);
    props.getFriendGroups(props.user.friendGroups); //in case of someone else has been added a new place to the friend group, we are updating the friend group data
  }, []);
  let onlyPersonalPlaces = [];
  if (props.user.friendGroups) {
    onlyPersonalPlaces = props.user.places.filter(function (obj) {
      return props.friendGroups.places.indexOf(obj) === -1;
    });
  } else {
    onlyPersonalPlaces = props.user.places;
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.blue} />
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <FlatList
          style={{flex: 1, backgroundColor: "white"}}
          data={onlyPersonalPlaces}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Place data={item} index={index} props={props} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({authResponse, friendGroupResponse}) => {
  // const {myPlaces, myGroupPlaces} = placeResponse;
  const {user} = authResponse;
  const {friendGroups} = friendGroupResponse;
  return {user, friendGroups};
};

export default connect(mapStateToProps, {
  getFriendGroups,
})(Home);
