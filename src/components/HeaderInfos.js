import axios from "axios";
import React, { useEffect, useState } from "react";
import PercentageChange from "./PercentageChange";
import TableFilters from "./TableFilters";

const HeaderInfos = () => {
  const [headerData, setheaderData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoaded(false);
      axios
        .get(`https://api.coingecko.com/api/v3/global`)
        .then((res) => {
          if (res) {
            setheaderData(res.data.data);
            setIsLoaded(true);
          }
        })
        .catch((e) => {
          console.log("erreur ", e);
          setErrorFetchedChecker((errorFetchedChecker) => !errorFetchedChecker);
        });
    }
    if (!isLoaded) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    } else {
      fetchData();
    }
  }, [errorFetchedChecker]);

  let nCryptos = "";
  // console.log("headerdata  ", headerData);
  let list = headerData.market_cap_percentage;
  // console.log("mkt cap = ", list);
  // console.log("headerdata btc :", list.btc);

  if (headerData.active_cryptocurrencies) {
    nCryptos = headerData.active_cryptocurrencies.toLocaleString("de-DE");
  }

  return (
    <div className="header-container">
      <div className="title">
        <li>
          <h1>
            <img src="./assets/logo.png" alt="logo" /> Watch Tower{" "}
          </h1>
        </li>
        <ul className="avec-espace">
          <li>Nombre de Crypto-monaies </li>
          <li>{nCryptos}</li>
        </ul>
        <ul className="avec-espace">
          <li> Nombre de marchés</li>
          <li> {headerData.markets && headerData.markets}</li>
        </ul>
      </div>
      <div className="infos-mkt">
        <li>
          Tendance du marché :
          <PercentageChange
            percent={headerData.market_cap_change_percentage_24h_usd}
          />
        </li>
        <li>Part de marché Bitcoin : {list.btc.toFixed(1) + "%"}</li>
        <li>Part de marché Ethereum : {list.eth.toFixed(1) + "%"}</li>
      </div>
      <TableFilters />
    </div>
  );
};

export default HeaderInfos;
