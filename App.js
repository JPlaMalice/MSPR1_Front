import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Products from "./components/Products";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductDesc from "./components/ProductDesc";
import ProfileScreen from "./components/ProfileScreen";
import HomePage from "./components/HomePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseConfigProvider } from "native-base"; // Importez NativeBaseConfigProvider depuis native-base
import ProductInCartList from "./components/ProductsInCartList";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDesc" component={ProductDesc} />
        <Stack.Screen name="ProductsInCartList" component={ProductInCartList} />
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
