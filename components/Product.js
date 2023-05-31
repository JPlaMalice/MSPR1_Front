import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import ProductDesc from "./ProductDesc";
import { useEffect } from "react";
import ProductImg from "./ProductImg";
// import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native";

const Product = (props) => {
  const { name, image, label, description } = props.product;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // console.log(props.product.id);
  };

  return (
    <>
      <View style={styles.container}>
        <ProductImg objs={props.product.id} />
        <Text style={styles.name}>{label}</Text>
        <Text style={styles.price}>{description}</Text>
      </View>

      {/* <Card>
        <Card.Header
          title="This is title"
          thumbStyle={{ width: 30, height: 30 }}
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          extra="this is extra"
        />
        <Card.Body>
          <View style={{ height: 42 }}>
            <Text style={{ marginLeft: 16 }}>Card Content</Text>
          </View>
        </Card.Body>
        <Card.Footer content="footer content" extra="footer extra content" />
      </Card> */}
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
