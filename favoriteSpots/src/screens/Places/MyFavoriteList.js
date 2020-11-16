import React, {useContext, useEffect} from "react";
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
import Place from "./Place";
import {Icon} from "native-base";
import {fonts, colors} from "../../style";
import * as RootNavigation from "../../RootNavigation";
const MyFavoriteList = (props) => {
  return (
    <SafeAreaView>
      <Icon
        style={{color: colors.blue, marginLeft: 10, fontSize: 40}}
        type="FontAwesome"
        name="angle-left"
        onPress={() => {
          RootNavigation.navigate("Home");
        }}></Icon>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <FlatList
          style={{flex: 1, backgroundColor: "white"}}
          data={props.user.places}
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
