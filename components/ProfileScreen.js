import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Product from "./Product";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is 's profile</Text>;
};

export default ProfileScreen;
