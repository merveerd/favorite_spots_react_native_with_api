import React from "react";
import {Thumbnail} from "native-base";
import {StyleSheet, FlatList, TouchableOpacity, Text} from "react-native";
import {colors} from "../style";
const SearchList = (props) => {
  return (
    <FlatList
      data={props.searchResults}
      extraData={true}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            props.onPress(item);
          }}>
          <Thumbnail
            source={
              item[props.source]
                ? item[props.source]
                : require("../assets/dummy.png") //it is for user search
            }></Thumbnail>
          <Text style={styles.text}>{item[props.text]}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => `${index}`}></FlatList>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: colors.somon,
    padding: 10,
    marginHorizontal: 16,
  },
});
export {SearchList};
