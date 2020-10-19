import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {colors, fonts} from "../../style";
import {connect} from "react-redux";
import {Button, Input, Header} from "../../components";
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
        onPress={() => {
          // if (!item.members.includes(props.route.params.uid)) {
          //   item.members.push(props.route.params.uid);
          //   props.updateFriendGroup(item); //sending updated friend group
          // } else {
          //   Alert.alert('warning', 'this person is already in this hub!');
          // }
        }}>
        <Text style={styles.text}>{item.name}</Text>
        <Button
          style={styles.customButton}
          disabled={isDisabled}
          text={"Add"}
          onPress={() => {
            setDisabled(true);

            if (placeInfo.friendGroups) {
              if (!placeInfo.friendGroups.includes(item.id)) {
                props.addGroupPlace({
                  placeId: placeInfo.id,
                  friendGroupId: item.id,
                });
              } else {
                Alert.alert(
                  "Nope",
                  "You have already shared this place with this friend hub",
                );
              }
            } else {
              props.addGroupPlace({
                placeId: placeInfo.id,
                friendGroupId: item.id,
              });
            }
          }}></Button>
      </View>
    </View>
  );
  return (
    <SafeAreaView>
      <Icon
        style={{color: colors.blue, marginLeft: 10, fontSize: 40}}
        type="FontAwesome"
        name="angle-left"
        onPress={() => {
          RootNavigation.navigate("Home");
        }}></Icon>
      {placeInfo ? (
        <View style={{alignItems: "center"}}>
          <View>
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
              {placeInfo.location.adress}
            </Text>

            {placeInfo.image && (
              <View>
                <Image
                  source={{uri: placeInfo.image}}
                  style={{width: "100%", height: 150}}
                  resizeMode="cover"
                />
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 100,
                marginTop: 10,
              }}></View>
          </View>

          {addPlaceInHub ? (
            <View>
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
            </View>
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
    marginTop: 10,
    height: 45,
    alignSelf: "center",
    marginBottom: 20,
    width: 250,
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
    marginHorizontal: 16,
  },
  text: {
    padding: 20,
    fontSize: fonts.small,
  },
});
