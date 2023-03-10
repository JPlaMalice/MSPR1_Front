import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductDesc = ({ route }) => {
  const { product } = route.params;

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
    </View>
  );
};

export default ProductDesc;
