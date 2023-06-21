import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import ImageComponent from "./ImageComponent";

function ProductImg({ objs }) {
  const [dataResponse, setDataResponse] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url =
      "http://15.237.14.230/api/index.php/documents?modulepart=product&id=" +
      objs +
      "&DOLAPIKEY=" +
      user;
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
