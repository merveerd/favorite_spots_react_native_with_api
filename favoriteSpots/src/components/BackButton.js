import React from "react";
import {Dimensions} from "react-native";
import {colors} from "../style";
import {Icon} from "native-base";
import * as RootNavigation from "../RootNavigation";

const BackButton = (props) => (
  <Icon
    style={{color: colors.blue, marginLeft: 10, fontSize: 40}}
    type="FontAwesome"
    name="angle-left"
    onPress={() => {
      RootNavigation.navigate("Main");
    }}></Icon>
);

export {BackButton};
