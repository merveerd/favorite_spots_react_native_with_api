import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {Icon} from 'native-base';

import {colors, fonts, appName} from '../../style';
import {isUser} from '../../actions';

const Entrance = (props) => {
  useEffect(() => {
    props.isUser();
  }, []);

  if (props.loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: colors.purple,
      }}>
      <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
      <View style={styles.logoView}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.bodyView}>
        <Text style={appName}>HUBSPOTS</Text>
        <Text style={styles.mainText}>Find your favorite spots!</Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}>
          <Text style={styles.whiteText}>
            Challenge Accepted!
            <Text style={styles.blueText}>Create an account</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerView}>
        <Text style={styles.whiteText}>Already have an account?</Text>
        <Text
          style={styles.blueText}
          onPress={() => {
            props.navigation.navigate('SignIn');
          }}>
          Come In
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderTopWidth: 0,

    borderColor: colors.purple,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: colors.blue,
  },
  logo: {
    width: '52%',
    height: '70%',
  },
  bodyView: {
    flex: 3,
    marginTop: '10%',
    alignItems: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: fonts.main,
    color: 'white',
    fontStyle: 'italic',
    margin: '7%',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  whiteText: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: fonts.small,
  },
  blueText: {
    color: colors.blue,

    marginLeft: 8,
    fontSize: fonts.medium,
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({authResponse}) => {
  const {loading, user} = authResponse;
  return {loading, user};
};

export default connect(mapStateToProps, {isUser})(Entrance);
