import React from "react";
import { View, StyleSheet, Text, Button, Modal } from "react-native";
import { List, Divider } from "react-native-paper";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const ProductInCartList = (props) => {
  const products = props.route.params;
  const { user } = useContext(AuthContext);
  const [listOfElements, setListOfElements] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const updatedList = [];
      let priceTotal = 0;

      for (let i = 0; i < products.length; i++) {
        const id = products[i];
        try {
          const response = await axios.get(
            `http://15.237.14.230/api/index.php/products/${id}?DOLAPIKEY=${user}`
          );
          const data = response.data;
          updatedList.push(data);
          const num = parseFloat(data.price);
          priceTotal = priceTotal + num;
          "updatedList", priceTotal;
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

  const handleValidation = async () => {
    const groupedElements = listOfElements.reduce((acc, element) => {
      if (acc[element.id]) {
        acc[element.id].qty += 1;
      } else {
        acc[element.id] = { ...element, qty: 1 };
      }
      return acc;
    }, {});

    const orderData = {
      socid: 2,
      date: Date.now() / 1000,
      type: 0,
      lines: Object.values(groupedElements).map((element) => ({
        fk_product: element.id,
        qty: element.qty,
        subprice: element.price,
        tva_tx: element.tva_tx,
      })),
    };

    try {
      const response = await axios.post(
        `http://15.237.14.230/api/index.php/orders?DOLAPIKEY=${user}`,
        orderData
      );

      // Effectuer la validation finale de la commande
      const validateResponse = await axios.post(
        `http://15.237.14.230/api/index.php/orders/${response.data}/validate?DOLAPIKEY=${user}`
      );
      setIsModalVisible(true);
    } catch (error) {
      console.error("Erreur lors de la validation de la commande", error);
    }
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
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
      <View style={styles.buttonContainer}>
        <Button title="Valider le panier" onPress={handleValidation} />
      </View>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          Total : {totalPrice.toFixed(2)} €
        </Text>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Commande validée !</Text>
            <Button title="Fermer" onPress={closeModal} />
          </View>
        </View>
      </Modal>
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
  buttonContainer: {
    position: "absolute",
    color: "rgb(149, 116, 55)",

    bottom: 16,
    right: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProductInCartList;
