import React from "react";
import {TextInput, Dimensions} from "react-native";
import {colors} from "../style";

const {width, height} = Dimensions.get("window");

const Input = (props) => (
  <TextInput
    placeholder={props.placeholder}
    placeholderTextColor={"grey"}
    autoCapitalize="none"
    secureTextEntry={props.secureTextEntry}
    keyboardType={props.keyboardType}
    multiline={props.multiline}
    value={props.value}
    autoFocus={props.autoFocus}
    autoComplete={false}
    onChangeText={(value) => props.onChangeText(value)}
    style={[
      {
        width: "80%",

        height: "13%",
        padding: 8,
        marginBottom: "5%",
        borderWidth: 0.2,
        borderColor: colors.somon,

        color: "#424242",
        borderLeftWidth: 5,
        borderRadius: 12,
      },
      props.style,
    ]}
  />
);

export {Input};
