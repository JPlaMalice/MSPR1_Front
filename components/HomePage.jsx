import { Text, View } from "react-native";
import React, { Component } from "react";
import Products from "./Products";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const HomePage = () => {
  const Stack = createStackNavigator();


  return(
    <navigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={Products} />
      </Stack.Navigator>
    </navigationContainer>

  );
};

export default HomePage;
