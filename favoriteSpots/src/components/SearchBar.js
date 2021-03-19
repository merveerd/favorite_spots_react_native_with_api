import React from "react";
import {Icon, Input, Item} from "native-base";

const SearchBar = (props) => {
  return (
    <Item>
      <Icon name="search" type="FontAwesome"></Icon>
      <Input
        autoCompleteType="off"
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </Item>
  );
};

export {SearchBar};
