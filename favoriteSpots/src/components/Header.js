import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {BackButton} from './BackButton';
import {fonts, colors, appName} from '../style';
import {Icon} from 'native-base';
import * as RootNavigation from '../RootNavigation';
const Header = (props) => {
  return (
    <View style={styles.header}>
      <BackButton />
      <View style={{alignItems: 'center'}}>
        <Text style={[appName, {fontSize: fonts.small, color: 'white'}]}>
          HubSpots
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('Messages');
        }}>
        <Icon
          style={{color: colors.blue}}
          type="FontAwesome"
          name="envelope"></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.somon,
    padding: 10,
  },
});

export {Header};
