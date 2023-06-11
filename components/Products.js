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
import Icon from "react-native-vector-icons/FontAwesome";
import ProductsCart from "./ProductsCartButton";
import { ButtonGroup } from "react-native-elements";
import { Button } from "react-native-paper";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const addTo = (product) => {
    console.log("porrrrrrod", product);
    setCartCount((prevCartCount) => [...prevCartCount, product]);
  };

  const fetchData = async () => {
    axios
      .get("http://15.237.14.230/api/index.php/products?DOLAPIKEY=kawa")
      .then((response) => {
        setProducts(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // Gérer les erreurs de la requête
        console.error(error);
      });
  };

  function handleClick() {
    console.log(cartCount);
  }

  const onPress = (productId) => {
    props.navigation.navigate("ProductDesc", { productId, addTo });
  };

  const navigateTo = () => {
    props.navigation.navigate("ProductsInCartList", cartCount);
  };
  return (
    <View style={styles.container}>
      <Text>{cartCount}</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => onPress(item)}>
            <View>
              <Product navigation={navigation} product={item} />
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id.toString()} // Convertir l'ID en chaîne de caractères pour le keyExtractor
      />
      <ProductsCart navigateToList={navigateTo} />
    </View>
  );
};

export default Products;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
