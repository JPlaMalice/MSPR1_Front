import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import axios from "axios";

const ImageComponent = (props) => {
  const [imageSource, setImageSource] = useState(null);

  const fetchData = () => {
    const urlTwo =
      "https://35.180.116.200/api/index.php/documents/download?modulepart=product&original_file=" +
      props.props[0].level1name +
      "%2F" +
      props.props[0].name +
      "&DOLAPIKEY=kawa";
    console.log("urlbis", urlTwo);
    axios
      .get(urlTwo)
      .then((response) => {
        console.log("content:", response.data.content);
        setImageSource(response.data.content);
        console.log("lasoruce", imageSource);
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
          style={{ width: "100%", height: 200 }}
        />
      )}
    </View>
  );
};

export default ImageComponent;
