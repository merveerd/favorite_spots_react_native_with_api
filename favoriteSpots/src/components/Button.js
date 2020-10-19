import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colors, fonts} from '../style';

const Button = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.onPress}
    style={[
      {
        borderWidth: 2,
        backgroundColor: colors.blue,
        borderColor: colors.blue,
        width: '97%',
        height: '13%',

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
      },
      props.style,
    ]}>
    {props.loading ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text
        style={[
          {
            color: 'white',

            fontSize: fonts.small,
          },
          props.textStyle,
        ]}>
        {props.text}
      </Text>
    )}
  </TouchableOpacity>
);

export {Button};
