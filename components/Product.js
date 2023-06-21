import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import ProductDesc from "./ProductDesc";
import { useEffect } from "react";
import ProductImg from "./ProductImg";
import { Card } from "react-native-paper";

const Product = (props) => {
  const { name, image, label, description, price } = props.product;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {};

  return (
    <>
      <View style={styles.container}>
        <ProductImg objs={props.product.id} />
        <Text style={styles.name}>{label}</Text>
        <Text style={styles.price}>{description}</Text>
        <View style={styles.badgeContainer}>
          <Card style={styles.badge}>
            <Text style={styles.badgeText} props={props}>
              ${Number(price).toFixed(2)}
            </Text>
          </Card>
        </View>
      </View>
    </>
  );
};

export default Product;

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
    width: "90%",
    alignSelf: "center",
  },
  fonts: {
    marginBottom: 8,
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
  badgeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  badge: {
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
