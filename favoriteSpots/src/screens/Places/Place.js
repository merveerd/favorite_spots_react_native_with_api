import React, {useState} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {Icon} from "native-base";
import {colors, fonts} from "../../style";
import {connect} from "react-redux";
import * as RootNavigation from "../../RootNavigation.js";
const Place = (props) => {
  //icon section will be added when friendGroup places available
  const {image, placeName, user, desc, createdDate} = props.data;

  // const [groupNames, setGroupNames] = useState([]);

  const SharedFriendGroups = () => {
    let groupNames = [];
    props.data.friendGroups.forEach((item, index) => {
      props.friendGroups.forEach((group) => {
        if (group.id === item) {
          groupNames.push(group.name);
        }
      });
    });
    return groupNames.map((groupName, index) => (
      <Text key={index} style={{fontSize: 12, margin: 5, color: colors.purple}}>
        {groupName}
      </Text>
    ));
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        RootNavigation.replace("PlaceDetails", props); //place id will be sent
      }}
      style={{
        padding: 20,
        borderBottomWidth: 0.5,
        borderColor: colors.somon,
        flexDirection: "row",
      }}>
      <View style={{flex: 9, marginLeft: 10}}>
        {/* <Text style={{fontSize: 14, fontWeight: 'bold'}}>{placeName}</Text> */}

        <Text style={{fontSize: fonts.small, marginTop: 5}}>{desc}</Text>
        {props.data.friendGroups ? (
          <View style={{flexDirection: "row"}}>
            <SharedFriendGroups />
          </View>
        ) : (
          []
        )}
        {image && (
          <View>
            <Image
              source={{uri: image}}
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
    </TouchableOpacity>
  );
};

const mapStateToProps = ({placeResponse, friendGroupResponse}) => {
  const {myPlaces} = placeResponse;
  const {friendGroups} = friendGroupResponse;
  return {myPlaces, friendGroups};
};

export default connect(mapStateToProps, {})(Place);
