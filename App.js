import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductDesc from "./components/ProductDesc";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDesc" component={ProductDesc} />
      </Stack.Navigator>
    </NavigationContainer>
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
