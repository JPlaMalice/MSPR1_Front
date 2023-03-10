import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Product from "./Product";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductDesc from "./ProductDesc";

const Products = (navigation) => {
  const products = [
    {
      id: 1,
      name: "T-shirt noir",
      image: "https://source.unsplash.com/400x400/?black,t-shirt",
      price: 25.99,
    },
    {
      id: 2,
      name: "Chaussures de course",
      image: "https://source.unsplash.com/400x400/?running,shoes",
      price: 89.99,
    },
    {
      id: 3,
      name: "Jeans déchiré",
      image: "https://source.unsplash.com/400x400/?jeans,ripped",
      price: 49.99,
    },
    {
      id: 4,
      name: "Veste en cuir",
      image: "https://source.unsplash.com/400x400/?leather,jacket",
      price: 149.99,
    },
  ];
  return (
    <View>
      <FlatList
        style={{ styles }}
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductDesc", { ProductDesc })}
          >
            <Product product={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  FlatList: {
    margin: 10,
  },
});

export default Products;
