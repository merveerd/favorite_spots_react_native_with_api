import React, {useState} from "react";
import {View, SafeAreaView, StyleSheet, StatusBar} from "react-native";
import {connect} from "react-redux";
import {getUsers} from "../../helpers/APIRequests";
import {fonts} from "../../style";
import {SearchBar, SearchList} from "../../components";
import * as RootNavigation from "../../RootNavigation";
const Search = (props) => {
  //places or user search
  const [results, setResults] = useState([]);
  const searchUser = async (text) => {
    if (text.length >= 3) {
      const returnedResults = await getUsers({query: text});
      setResults(returnedResults);
      return;
    }
    setResults([]);
  };
  const selectUser = (item) => {
    RootNavigation.navigate("UserDetails", item);
  };

  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 20}}>
        <SearchBar
          placeholder="search people"
          onChangeText={(text) => {
            searchUser(text);
          }}
        />
        <SearchList
          searchResults={results
            .slice(0, 7)
            .filter((user) => user._id !== props.user._id)}
          onPress={selectUser}
          text="username"
          source="image"
        />
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

const mapStateToProps = ({authResponse, placeResponse}) => {
  const {myPlaces} = placeResponse;
  const {user} = authResponse;
  return {myPlaces, user};
};

export default connect(mapStateToProps, {})(Search);
