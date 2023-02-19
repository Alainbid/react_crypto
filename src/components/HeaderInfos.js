import axios from "axios";
import React, { useEffect, useState } from "react";
import PercentageChange from "./PercentageChange";
import TableFilters from "./TableFilters";

const HeaderInfos = () => {
  const [headerData, setheaderData] = useState([]);
  const [headerBtc, setheaderBtc] = useState([]);
  const [headerEth, setheaderEth] = useState([]);
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/global`)
      .then((res) => {
        if (res) {
          setheaderData(res.data.data);
          setheaderBtc(res.data.data.market_cap_percentage.btc);
          setheaderEth(res.data.data.market_cap_percentage.eth);
        }
      })
      .catch((e) => {
        console.log("erreur ", e);
        setErrorFetchedChecker((errorFetchedChecker) => !errorFetchedChecker);
      });
  }, [null]);

  let nCryptos = "";

  let btc = parseFloat(headerBtc).toFixed(1);
  let eth = parseFloat(headerEth).toFixed(1);

  console.log("headerdata  ", headerData);
  console.log("headerdata btc  :", btc);

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
        <li>Part de marché Bitcoin : {btc + "%"}</li>
        <li>Part de marché Ethereum : {eth + "%"}</li>
      </div>
      <TableFilters />
    </div>
  );
};

export default HeaderInfos;
