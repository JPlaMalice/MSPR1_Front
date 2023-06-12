import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import jwtDecode from "jwt-decode";
const HomePage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    const tokens =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub20iOiJUb3RvIiwiZG9sYXBpa2V5IjoiZG9sYXBpa2V5In0.Jf8yLbHEJHMqJg8RRE2UlZ0kKnkreoeQ27FEhyXvIMc";
    const decodedToken = jwtDecode(tokens);
    console.log(decodedToken); // En-tête du token JWT
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    const token = data;
    try {
      const decodedToken = jwt.verify(token, secretKey);
      console.log(decodedToken);
      // Le token est valide, vous pouvez accéder à son contenu décodé
      navigation.navigate("Products");
    } catch (error) {
      console.log(
        "Erreur de vérification de la signature du token:",
        error.message
      );
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData("");
  };

  if (hasPermission === null) {
    return <Text>Demande de permission de caméra...</Text>;
  }
  if (hasPermission === false) {
    return (
      <>
        <Button
          title="Admin Skip button"
          onPress={() => navigation.navigate("Products")}
        />
        <Text>Pas d'accès à la caméra</Text>
      </>
    );
  }

  return (
    <>
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
    </>
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
