import React, {useEffect} from 'react';
import {
  Text,
  View,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {colors, fonts} from '../../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const Menu = (props) => {
  const sections = (icon, name, onPress) => {
    return (
      <View style={styles.sectionsFunction}>
        {icon != null ? (
          <Icon name={icon} size={20} color="white" style={{width: '10%'}} />
        ) : null}
        <Text
          onPress={onPress}
          style={{fontSize: fonts.small, marginLeft: '5%', color: 'white'}}>
          {name}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.blue}}>
      <View style={styles.profileView}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => {
            props.navigation.navigate('Profile');
          }}>
          {props.profile_image ? (
            <Image source={{uri: ''}} style={styles.profilePhoto} />
          ) : (
            <View style={styles.IconView}>
              <Icon name={'user-circle'} size={40} color="white" />
            </View>
          )}
          <Text style={styles.nameText}>{props.name}</Text>
        </TouchableOpacity>
        <Text style={styles.descriptionText}>52 favorite places</Text>
      </View>
      <View style={styles.sectionView}>
        <ScrollView>
          <View style={styles.sections}>
            {sections('map-pin', 'My Favorite Places', () => {
              props.navigation.navigate('MyFavoriteList');
            })}
            {sections('smile-o', 'Friend Hubs', () => {
              props.navigation.navigate('FriendGroups');
            })}
            {sections('user-plus', 'Friend Requests', () => {
              props.navigation.navigate('Profile');
            })}
            {sections('address-book', 'Create a New Friend Group', () => {
              props.navigation.navigate('Search');
            })}
          </View>

          <View style={styles.sections}>
            <View style={styles.line} />
            {sections('pencil', 'Settings', () => {
              props.navigation.navigate('Settings');
            })}
          </View>

          <View style={styles.sections}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
              }}>
              {sections('chevron-left', 'Close', () => {
                props.navigation.closeDrawer();
              })}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  IconView: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.somon,
  },
  sectionsFunction: {
    flexDirection: 'row',

    alignItems: 'center',
    marginVertical: '7%',
  },
  profileView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: fonts.medium,
    color: 'white',
  },
  descriptionText: {
    fontSize: fonts.small,
    color: 'white',
  },
  sectionView: {
    justifyContent: 'space-between',
  },
  sections: {
    padding: 20,
  },
  line: {
    backgroundColor: colors.somon,
    height: 0.5,
  },
});
export default Menu;
