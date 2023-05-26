import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import Products from "./Products";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
const HomePage = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  const onPress = () => {
    navigation.navigate("Products");
  };
  return (
    <>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Products")}
      />
      <TouchableOpacity onPress={onPress}>
        <Text>Bonchourrrr</Text>
      </TouchableOpacity>
    </>
  );
};

export default HomePage;
