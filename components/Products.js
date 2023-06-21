import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
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

const Products = (props) => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const addTo = (product) => {
    setCartCount((prevCartCount) => [...prevCartCount, product]);
  };

  const fetchData = async () => {
    const url =
      "http://15.237.14.230/api/index.php/categories/2/objects?type=product&DOLAPIKEY=" +
      user;
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        // Gérer les erreurs de la requête
        console.error(error);
      });
  };

  const onPress = (productId) => {
    props.navigation.navigate("Description du produit", { productId, addTo });
  };

  const navigateTo = () => {
    props.navigation.navigate("Panier", cartCount);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => onPress(item)}>
            <View>
              <Product product={item} />
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id.toString()}
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
