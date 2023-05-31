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

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get("http://35.180.116.200/api/index.php/products?DOLAPIKEY=kawa")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Gérer les erreurs de la requête
        console.error(error);
      });
  };

  const onPress = () => {
    props.navigation.navigate("ProductDesc", products);
    console.log();
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
