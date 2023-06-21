import React from "react";
import { View, Text, Image, StyleSheet, Linking } from "react-native";
import { useEffect } from "react";
import ProductImg from "./ProductImg";
import { Card } from "react-native-paper";
import ButtonPerso from "./ButtonPerso";
import { MaterialIcons } from "@expo/vector-icons";
import ProductsCartButton from "./ProductsCartButton";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
const ProductDesc = (props, addToCart) => {
  const { id, name, image, label, description, price, url } =
    props.route.params.productId;

  const addTo = props.route.params.addTo;
  useEffect(() => {}, []);

  const onClick = () => {
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
            ajouter au
          </Button>
        </View>
        <Button
          icon={({ size }) => (
            <FontAwesome name="cube" size={size} color={"#ffffff"} />
          )}
          mode="contained"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={[
            styles.viewEnvironmentButton,
            { backgroundColor: url ? "#957437" : "#888888" }, // Modifier la couleur du fond en fonction de l'état de l'URL
          ]}
          labelStyle={{ fontWeight: "bold", fontSize: 16 }}
          buttonColor="#957437"
          onPress={() => {
            if (url) {
              Linking.openURL(url);
            }
          }} // Appel de la fonction onPress passée en prop
          disabled={!url} // Rendre le bouton inutilisable si l'URL est vide ou nulle
        >
          Visualiser dans l'environnement
        </Button>
      </View>
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

  viewEnvironmentButton: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#957437",
    alignSelf: "center",
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
