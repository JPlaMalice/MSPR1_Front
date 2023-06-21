import React, { useEffect, useState, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const ImageComponent = (props) => {
  const { user } = useContext(AuthContext);
  const [imageSource, setImageSource] = useState(null);

  const fetchData = () => {
    const urlTwo =
      "http://15.237.14.230/api/index.php/documents/download?modulepart=product&original_file=" +
      props.props[0].level1name +
      "%2F" +
      props.props[0].name +
      "&DOLAPIKEY=" +
      user;
    axios
      .get(urlTwo)
      .then((response) => {
        setImageSource(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {imageSource && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageSource}` }}
          style={{ width: "100%", height: 300 }}
        />
      )}
    </View>
  );
};

export default ImageComponent;
