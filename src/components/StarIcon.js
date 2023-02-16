import React, { useEffect, useState } from "react";

const StarIcon = (coinId) => {
  const [like, setLike] = useState("");
  const vide = "./assets/star-empty.svg";
  const pleine = "./assets/star-full.svg";

  const starVisible = (coinId) => {
    let v = "";
    let x = JSON.stringify(coinId);
    if ((v = localStorage.getItem(x))) {
      // console.log(coinId, " v =  ", v);
      return v === "true" ? pleine : vide;
    } else {
      return vide;
    }
  };

  return (
    <img
      src={starVisible(coinId)}
      alt="star-icon"
      onClick={(img) => {
        let val = "";
        let x = JSON.stringify(coinId);
        val = localStorage.getItem(x);
        // console.log(x, " val  ", val);

        if (val === "true") {
          localStorage.setItem(x, "false");
          setLike("false");
        }
        if (val === "false" || val === null) {
          localStorage.setItem(x, "true");
          setLike("true");
        }
      }}
    />
  );
};

export default StarIcon;
