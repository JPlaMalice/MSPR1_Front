import React from "react";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
const ButtonPerso = ({ labelButton, onPress, iconButton, onClick }) => {
  const [buttonColor, setButtonColor] = useState("#ffffff");

  return (
    <Button
      icon={({ size, color }) => (
        <FontAwesome name={iconButton} size={size} color={color} />
      )}
      mode="contained"
      contentStyle={{ flexDirection: "row-reverse" }}
      style={{ borderRadius: 10, marginVertical: 10, width: 200 }}
      labelStyle={{ fontWeight: "bold", fontSize: 16 }}
      buttonColor="#957437"
    >
      {labelButton}
    </Button>
  );
};

export default ButtonPerso;
