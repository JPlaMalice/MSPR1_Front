import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import jwt from "jsonwebtoken";

import { Constants } from "expo-constants";
import { Crypto } from "expo-crypto";

const HomePage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    console.log("data", data);
    const decoded = jwt.verify(
      data,
      "mspr_dolib@arr_edgar_edgar_lynda_pierre_alexandre"
    );
    // try {
    //   console.log("data", data);
    //   const decoded = jwt.verify(
    //     data,
    //     "mspr_dolib@arr_edgar_edgar_lynda_pierre_alexandre"
    //   );
    //   console.log("oui"); // Token valide
    // } catch (error) {
    //   console.error("non"); // Token invalide
    // }
  };
  const handleScanAgain = () => {
    setScanned(false);
    setScannedData("");
  };

  if (hasPermission === null) {
    return <Text>Demande de permission de caméra...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'accès à la caméra</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      ) : (
        <View style={styles.dataContainer}>
          <Text style={styles.scannedText}>Code QR scanné :</Text>
          <Text style={styles.scannedData}>{scannedData}</Text>
          <Button title="Scanner à nouveau" onPress={handleScanAgain} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: "100%",
    height: "80%",
  },
  dataContainer: {
    alignItems: "center",
  },
  scannedText: {
    fontSize: 20,
    marginBottom: 10,
  },
  scannedData: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default HomePage;

// import { Text, TouchableOpacity, View } from "react-native";
// import React, { Component } from "react";
// import Products from "./Products";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Button } from "react-native";
// import ImageComp from "./imagecomp";
// const HomePage = ({ navigation }) => {
//   const Stack = createNativeStackNavigator();

//   const onPress = () => {
//     navigation.navigate("Products");
//   };
//   return (
//     <>
//       <Button
//         title="Go to Jane's profile"
//         onPress={() => navigation.navigate("Products")}
//       />
//       <TouchableOpacity onPress={onPress}>
//         <Text>Bonchourrrr</Text>
//         <ImageComp />
//       </TouchableOpacity>
//     </>
//   );
// };

// export default HomePage;
