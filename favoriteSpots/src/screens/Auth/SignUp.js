import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, BackButton} from '../../components';
import {connect} from 'react-redux';
import {signUp} from '../../actions';
import {colors, fonts, appName} from '../../style';

const SignUp = (props) => {
  const [name, setName] = useState('test');
  const [username, setUsername] = useState('test1');
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('123456');

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}>
          {/* Header  */}
          <BackButton />
          <View style={styles.headerView}>
            <Text style={appName}>HUBSPOTS</Text>
          </View>

          {/* Form  */}

          <View style={styles.formView}>
            <Input
              placeholder={'Name'}
              value={name}
              onChangeText={(name) => setName(name)}
            />

            <Input
              placeholder={'User Name'}
              value={username}
              onChangeText={(username) => setUsername(username)}
            />

            <Input
              placeholder={'Email'}
              value={email}
              onChangeText={(email) => setEmail(email)}
            />

            <Input
              placeholder={'Password'}
              secureTextEntry
              value={password}
              onChangeText={(password) => setPassword(password)}
            />

            <Button
              text={'Sign Up'}
              textStyle={styles.textStyle}
              onPress={() => {
                const params = {email, password, name, username};
                props.signUp(params);
              }}
              style={styles.button}
            />
          </View>

          {/* Footer  */}

          <View style={styles.footerView}>
            <View style={styles.footerContent}>
              <View style={styles.lineView}>
                <View style={styles.line} />
                <Text style={styles.lineTex}>OR</Text>
                <View style={styles.line} />
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={styles.iconContainer}>
                <Icon
                  name="facebook"
                  style={{fontSize: 25}}
                  color={colors.somon}>
                  <Text style={styles.textStyle} onPress={() => {}}>
                    Login with Facebook
                  </Text>
                </Icon>
              </View>

              <View style={styles.iconContainer}>
                <Icon name="google" style={{fontSize: 25}} color={colors.somon}>
                  <Text style={styles.textStyle} onPress={() => {}}>
                    Login with Google
                  </Text>
                </Icon>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  appName: {
    fontSize: fonts.big,
    fontFamily: 'BalsamiqSans-Bold',
    letterSpacing: 3,
    color: colors.blue,
  },
  formView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
  },

  button: {
    width: '85%',
  },
  textStyle: {
    fontSize: fonts.small,
    fontFamily: 'BalsamiqSans-Bold',
    color: 'black',
  },
  footerView: {
    flex: 1.5,
  },
  footerContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  lineView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },

  line: {
    width: '35%',
    height: 1,
    backgroundColor: colors.somon,
    margin: 10,
  },
  iconContainer: {
    width: '50%',
    padding: '2%',
  },
});
const mapStateToProps = ({authResponse}) => {
  const {loading, user} = authResponse;
  return {loading, user};
};

export default connect(mapStateToProps, {signUp})(SignUp);
