import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Product = ({ product, navigate }) => {
  const { name, image, price } = product;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: "90%", // Ajoutez cette propriété pour augmenter la largeur du conteneur
    alignSelf: "center", // Ajoutez cette propriété pour centrer le conteneur horizontalement
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});

export default Product;
