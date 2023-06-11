import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageComp() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const responseUrl =
      "http://15.237.14.230/api/index.php/documents/download?modulepart=product&original_file=P0001%2FP0001-Cafe-Bio.jpg&DOLAPIKEY=kawa";

    axios
      .get(responseUrl, { responseType: "text" })
      .then((response) => {
        console.log(response.data);

      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la réponse :", error);
      });
  }, []);

  if (!imageData) {
    return <div>Chargement de l'image...</div>;
  }

  return (
    <div>
      <img src={imageData.dataUrl} alt={imageData.filename} />
    </div>
  );
}

export default ImageComp;