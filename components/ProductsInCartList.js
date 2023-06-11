import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { List, Divider } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductInCartList = (props) => {
  const products = props.route.params;
  const [listOfElements, setListOfElements] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const updatedList = [];
      let priceTotal = 0;

      for (let i = 0; i < products.length; i++) {
        const id = products[i];
        try {
          const response = await axios.get(
            `http://15.237.14.230/api/index.php/products/${id}?DOLAPIKEY=kawa`
          );
          const data = response.data;
          updatedList.push(data);
          const num = parseFloat(data.price);
          priceTotal = priceTotal + num;
          console.log("updatedList", priceTotal);
        } catch (error) {
          console.error(error);
          // Gérer les erreurs de la requête pour un ID spécifique
        }
      }
      setTotalPrice(priceTotal);
      setListOfElements(updatedList);
    };

    fetchData();
  }, [products]);

  return (
    <View style={styles.container}>
      <List.Section>
        {listOfElements.length > 0 ? (
          listOfElements.map((element, index) => (
            <React.Fragment key={index}>
              <List.Item
                title={element.title}
                description={`Nom: ${element.label}`}
                left={() => (
                  <List.Icon
                    icon="cart"
                    color={element.inStock ? "green" : "rgb(149, 116, 55)"}
                  />
                )}
                right={() => (
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                      {" "}
                      {Number(element.price).toFixed(2)}€
                    </Text>
                  </View>
                )}
                style={styles.listItem}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
              />
              {index !== listOfElements.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <List.Item title="Loading..." style={styles.listItem} />
        )}
      </List.Section>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          Total : {totalPrice.toFixed(2)} €
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listItem: {
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    color: "gray",
  },
  priceContainer: {
    backgroundColor: "rgb(220, 220, 220)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-end",
  },
  price: {
    color: "black",
    fontWeight: "bold",
  },
  totalPriceContainer: {
    backgroundColor: "rgb(220, 220, 220)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 16,
  },
  totalPriceText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProductInCartList;
