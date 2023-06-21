import { StyleSheet, Text, View } from "react-native";
import Products from "./components/Products";
import { NavigationContainer } from "@react-navigation/native";
import ProductDesc from "./components/ProductDesc";
import HomePage from "./components/HomePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductInCartList from "./components/ProductsInCartList";
import { AuthProvider } from "./components/AuthContext";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Authentification" component={HomePage} />
          <Stack.Screen name="Produits" component={Products} />
          <Stack.Screen name="Description du produit" component={ProductDesc} />
          <Stack.Screen name="Panier" component={ProductInCartList} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
