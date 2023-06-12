import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageComponent from "./ImageComponent";

function ProductImg({ objs }) {
  const [dataResponse, setDataResponse] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url =
      "http://15.237.14.230/api/index.php/documents?modulepart=product&id=" +
      objs +
      "&DOLAPIKEY=kawa";
    axios
      .get(url)
      .then((response) => {
        setDataResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return dataResponse ? <ImageComponent props={dataResponse} /> : null;
}

export default ProductImg;
