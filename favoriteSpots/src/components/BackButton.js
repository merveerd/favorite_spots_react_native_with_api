import React from "react";
import {colors} from "../style";
import {Icon} from "native-base";

const BackButton = (props) => (
  <Icon
    style={{color: colors.blue, marginLeft: 10, fontSize: 40}}
    type="FontAwesome"
    name="angle-left"
    onPress={props.onPress}></Icon>
);

export {BackButton};
