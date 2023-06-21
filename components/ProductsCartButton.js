import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ProductsCartButton(navigateToList) {
  const handleCartPress = () => {
    navigateToList.navigateToList();
  };

  return (
    <>
      <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
        <Icon name="shopping-cart" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgb(149, 116, 55)",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
