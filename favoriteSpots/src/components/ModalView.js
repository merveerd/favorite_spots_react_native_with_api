import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import {fonts, colors} from "../style";
import {TextInput} from "react-native-gesture-handler";
import {Icon} from "native-base";

const ModalView = (props) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        console.warn("close model");
      }}
      visible={props.visible}>
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeModal}
          onPress={props.closeOnPress}>
          <Text>Close</Text>
          <Icon type="FontAwesome" name="close"></Icon>
        </TouchableOpacity>
        <View style={styles.modalItems}>
          <TextInput
            style={styles.customInput}
            onChangeText={props.onChangeText}
            placeholder="Choose a name"
            placeholderTextColor="black"></TextInput>
          <Text style={{fontSize: fonts.medium}} onPress={props.onPress}>
            {props.textContent}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  customInput: {
    width: "60%",
    height: "40%",
    borderRadius: 30,
    textAlign: "center",

    backgroundColor: colors.blue,
    fontSize: fonts.medium,
  },
  modalView: {
    marginTop: Dimensions.get("window").height / 2,
    maxHeight: Dimensions.get("window").height / 2,
    backgroundColor: colors.somon,
  },
  modalItems: {
    alignItems: "center",
    justifyContent: "center",
  },
  closeModal: {
    marginRight: 0,
  },
});
