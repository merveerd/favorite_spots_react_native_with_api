import React, {useContext, useEffect, useState} from 'react';
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
import Place from '../Places/Place';
import {
  getMyPlaces,
  getFriendGroups,
  getFriendGroupsPlaces,
} from '../../actions';
//import {AuthContext} from '../../context';
import {fonts, colors} from '../../style';
const Home = (props) => {
  const [groupPlaces, setGroupPlaces] = useState([]);

  useEffect(() => {
    if (props.friendGroups.length === 0) {
      //I will move it to sign In button straight away

      console.log('no friend group');

      props.getFriendGroups(props.user);
    }
    if (props.myPlaces.length === 0) {
      //for adding new place also the user should come to home first so it is safe to check its length
      console.log('no favorite place');
      props.getMyPlaces(props.user.uid);
    }
  }, []);

  useEffect(() => {
    console.log('added FRIEND GRIOUPS');
    if (props.myGroupPlaces.length === 0 && props.friendGroups) {
      props.friendGroups.forEach((group) => {
        props.getFriendGroupsPlaces({id: group.id}); //can be onsnapshot
      });
    }
  }, [props.friendGroups]);

  //  let allPlaces = props.myPlaces.concat(props.myGroupPlaces);
  let allPlaces = props.myPlaces.filter(function (obj) {
    return props.myGroupPlaces.indexOf(obj) == -1;
  });

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.blue} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <FlatList
          style={{flex: 1, backgroundColor: 'white'}}
          data={allPlaces}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Place data={item} index={index} props={props} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({
  placeResponse,
  authResponse,
  friendGroupResponse,
}) => {
  const {myPlaces, myGroupPlaces} = placeResponse;
  const {user} = authResponse;
  const {friendGroups} = friendGroupResponse;
  return {myPlaces, myGroupPlaces, user, friendGroups};
};

export default connect(mapStateToProps, {
  getMyPlaces,
  getFriendGroups,
  getFriendGroupsPlaces,
})(Home);
