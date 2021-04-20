import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import {colors, fonts} from "../../style";
import {connect} from "react-redux";
import {Button} from "../../components";
import {getFriendGroups, addGroupPlace} from "../../actions";
import {Icon} from "native-base";
import * as RootNavigation from "../../RootNavigation";

const PlaceDetails = (props) => {
  const [placeInfo, setPlaceInfo] = useState(null);
  const [addPlaceInHub, setAddPlaceInHub] = useState(null);
  const [results, setResults] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    setPlaceInfo(props.route.params.data);
    console.log("info", props.route.params.data);
  }, []);

  const searchGroup = (text) => {
    if (props.friendGroups.length === 0) {
      props.getFriendGroups(props.user);
    } else {
      let arr = props.friendGroups.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase()),
      );
      setResults(arr.slice(0, 5));
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
          borderColor: colors.somon,
        }}
        onPress={() => {}}>
        <Text style={styles.text}>{item.name}</Text>
        <Button
          style={styles.customButton}
          disabled={isDisabled}
          text={"Add"}
          onPress={() => {
            setDisabled(true);

            props.addGroupPlace({
              place: placeInfo, //will be added comments [], desc optional, images []
              friendGroup: item,
            });
          }}></Button>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 3}}>
      <Icon
        style={{color: colors.blue, marginLeft: 10, fontSize: 40}}
        type="FontAwesome"
        name="angle-left"
        onPress={() => {
          RootNavigation.navigate("Home");
        }}></Icon>
      {placeInfo ? (
        <View style={{flex: 3, alignItems: "center"}}>
          <View style={{flex: 2, alignItems: "center"}}>
            <Text style={{fontSize: fonts.medium, fontWeight: "bold"}}>
              {placeInfo.desc}
              <Text
                style={{
                  color: colors.somon,
                  fontWeight: "100",
                  fontSize: 10,
                }}></Text>
            </Text>

            <Text style={{fontSize: 12, marginTop: 5, marginBottom: 10}}>
              {placeInfo.location.address}
            </Text>

            {/* {placeInfo.photos.length && (
              <Image
                source={{uri: placeInfo.photos[0]}}
                style={{
                  width: "100%",
                  height: "70%",
                  resizeMode: "contain",
                  padding: 0,
                  margin: 0,
                }}
              />
            )} */}
          </View>

          {addPlaceInHub ? (
            <>
              <TextInput
                placeholder="Plese enter the friend group"
                placeholderTextColor="black"
                style={[styles.buttonContainer, {fontSize: fonts.small}]}
                onChangeText={(text) => {
                  setGroupName(text);
                  searchGroup(text);
                }}></TextInput>
              {groupName ? (
                <FlatList
                  data={results}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => `${index}`}></FlatList>
              ) : (
                []
              )}
            </>
          ) : (
            <Button
              style={styles.buttonContainer}
              text={"Share with one of your friend hubs!"}
              onPress={() => {
                setAddPlaceInHub(true);
              }}></Button>
          )}
          <Button
            style={styles.buttonContainer}
            text={"Add more photos?"}
            onPress={() => {}}></Button>
        </View>
      ) : (
        []
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = ({
  placeResponse,
  friendGroupResponse,
  authResponse,
}) => {
  const {myPlaces} = placeResponse;
  const {friendGroups} = friendGroupResponse;
  const {user} = authResponse;
  return {myPlaces, friendGroups, user};
};

export default connect(mapStateToProps, {getFriendGroups, addGroupPlace})(
  PlaceDetails,
);

const styles = StyleSheet.create({
  body: {
    padding: 30,
    alignItems: "center",
  },
  buttonContainer: {
    textAlign: "center",
    height: 45,
    alignSelf: "center",
    marginBottom: 20,
    width: "60%",
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: colors.somon,
  },
  customInput: {
    width: "60%",
    height: "40%",
    borderRadius: 30,
    textAlign: "center",

    backgroundColor: colors.blue,
    fontSize: fonts.medium,
  },
  customButton: {
    width: "30%",
    height: "40%",
    borderRadius: 30,
    textAlign: "center",
  },
  item: {
    padding: 10,
  },
  text: {
    fontSize: fonts.small,
  },
});
