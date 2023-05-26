import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import Product from "./Product";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductDesc from "./ProductDesc";

const Products = (navigation) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/index.php/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onPress = () => {
    navigation.navigate("ProductDesc", products);
  };

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={onPress}>
            <View>
              <Product navigation={navigation} product={item} />
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id.toString()} // Convertir l'ID en chaîne de caractères pour le keyExtractor
      />
    </View>
  );
};

export default Products;
