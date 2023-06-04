import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Divider } from "react-native-paper";
import { useEffect, useState } from "react";

const ProductInCartList = (props) => {
  const products = props.route.params;
  const [listOfElements, setListOfElements] = useState([]);

  useEffect(() => {
    console.log("ca", products);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const updatedList = [];

      for (let i = 0; i < myArray.length; i++) {
        const id = myArray[i];
        const response = await fetch(`http://localhost/${id}`);
        const data = await response.json();
        updatedList.push(data);
      }

      setListOfElements(updatedList);
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <List.Section>
        {products.map((product, index) => (
          <React.Fragment key={index}>
            <List.Item
              title={product.title}
              description={`Price: $${product.price}`}
              left={() => (
                <List.Icon
                  icon="cart"
                  color={product.inStock ? "green" : "red"}
                />
              )}
            />
            {index !== products.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductInCartList;
