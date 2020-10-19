import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {colors} from '../style';

const CheckBox = (props) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: '13%',
        height: 20,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'gray',
        marginRight: 8,

        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {props.status && (
        <View
          style={{
            width: '100%',
            height: 20,
            backgroundColor: colors.somon,

            borderRadius: 2,
          }}
        />
      )}
    </TouchableOpacity>
    <Text>{props.text}</Text>
  </View>
);

export {CheckBox};
