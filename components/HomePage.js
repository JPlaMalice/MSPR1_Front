import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import jwtDecode from "jwt-decode";
import { AuthContext } from "./AuthContext";
import axios from "axios";
const HomePage = ({ navigation }) => {
  const { setUser, user } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate("Produits");
  };

  const verifyJwtCall = (tokenQR) => {
    const url = "https://jwtdecode.osc-fr1.scalingo.io/verify";
    axios
      .post(url, { token: tokenQR })
      .then((response) => {
        console.log("response", response.data.valid);
        if (response.data.valid == true) {
          processValidQR();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    const decodedToken = jwtDecode(data);
    console.log(decodedToken); // En-tête du token JWT
    verifyJwtCall(data);
    setUser(decodedToken.dolapikey);
  };

  const processValidQR = () => {
    setIsModalVisible(true);
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
          onPress={() => navigation.navigate("Produits")}
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
            <Button title="Scanner à nouveau" onPress={handleScanAgain} />
          </View>
        )}
        <Modal visible={isModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Vous etes bien authentifié en tant que :
              </Text>
              <Text>{user}</Text>
              <Text></Text>
              <Button title="Continuer" onPress={closeModal} />
            </View>
          </View>
        </Modal>
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

export default HomePage;
