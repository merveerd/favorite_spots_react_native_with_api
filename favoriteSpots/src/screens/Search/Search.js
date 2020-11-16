import React, {useState, useEffect} from "react";
import {
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {connect} from "react-redux";
import {Icon, Input, Item, Thumbnail, Text} from "native-base";
import {getUsers} from "../../actions";
import {fonts, colors} from "../../style";
import * as RootNavigation from "../../RootNavigation";
const Search = (props) => {
  //places or user search

  const searchUser = async (text) => {
    if (text.length >= 3) {
      props.getUsers({query: text});
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.5,
          borderColor: colors.somon,
        }}
        onPress={() => {
          RootNavigation.navigate("UserDetails", item);
        }}>
        <Thumbnail source={require("../../assets/dummy.png")}></Thumbnail>
        <Text style={styles.text}>{item.username}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 20}}>
        <Item>
          <Icon name="search" type="FontAwesome"></Icon>
          <Input
            placeholder="search people"
            onChangeText={(text) => {
              searchUser(text);
            }}
          />
        </Item>
        <FlatList
          data={props.users
            .slice(0, 7)
            .filter((user) => user._id !== props.user._id)}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginHorizontal: 16,
  },
  text: {
    padding: 20,
    fontSize: fonts.small,
  },
});

const mapStateToProps = ({authResponse, placeResponse, usersResponse}) => {
  const {myPlaces} = placeResponse;
  const {user} = authResponse;
  const {users} = usersResponse;
  return {myPlaces, users, user};
};

export default connect(mapStateToProps, {getUsers})(Search);
