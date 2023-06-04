import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import ProductImg from "./ProductImg";
import { Card } from "react-native-paper";
import ButtonPerso from "./ButtonPerso";
import { MaterialIcons } from "@expo/vector-icons";
import ProductsCartButton from "./ProductsCartButton";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
const ProductDesc = (props, addToCart) => {
  const { id, name, image, label, description, price } =
    props.route.params.productId;

  const addTo = props.route.params.addTo;
  useEffect(() => {
    console.log("lol", addTo);
  }, []);

  const onClick = () => {
    console.log(props.route.params.productId.id);
    addTo(props.route.params.productId.id);
  };

  return (
    <>
      <View style={styles.container}>
        <ProductImg objs={id} />
        <Text style={styles.name}>{label}</Text>
        <Text style={styles.price}>{description}</Text>
        <View style={styles.badgeContainer}>
          <Card style={styles.badge}>
            <Text style={styles.badgeText}>${Number(price).toFixed(2)}</Text>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={({ size, color }) => (
              <FontAwesome name="shopping-cart" size={size} color={"#ffffff"} />
            )}
            mode="contained"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={{ borderRadius: 10, marginVertical: 10, width: 200 }}
            labelStyle={{ fontWeight: "bold", fontSize: 16 }}
            buttonColor="#957437"
            onPress={onClick} // Appel de la fonction onPress passée en prop
          >
            "ajouter au"
          </Button>
          {/* <ButtonPerso
            labelButton="Ajouter au Panier"
            iconButton="shopping-cart"
            onClick={onClick()}
          />
          <div></div>
          <ButtonPerso labelButton="Realité Augmenté" iconButton="cube-solid" /> */}
        </View>
      </View>
      <ProductsCartButton />
    </>
  );
};

export default ProductDesc;

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
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
