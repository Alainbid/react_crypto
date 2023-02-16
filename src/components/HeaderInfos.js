import axios from "axios";
import React, { useEffect, useState } from "react";
import PercentageChange from "./PercentageChange";
import TableFilters from "./TableFilters";

const HeaderInfos = () => {
  const [headerData, setheaderData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/global`)
      .then((res) => setheaderData(res.data.data));
  }, []);
  let nCryptos = "";
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

        <li>Crypto monaies {nCryptos}</li>
        <li> Nombre de marchés {headerData.markets && headerData.markets}</li>
      </div>
      <div className="infos-mkt">
        <li>
          Tendance du marché :
          <PercentageChange
            percent={headerData.market_cap_change_percentage_24h_usd}
          />
        </li>
        <li>
          Part de marché BTC :{" "}
          {/* {headerData.market_cap_percentage.btc.toFixed(1) + "%"} */}
        </li>
        <li>
          part de marché ETH :{" "}
          {/* {headerData.market_cap_percentage.eth.toFixed(1) + "%"} */}
        </li>
      </div>
      <TableFilters />
    </div>
  );
};

export default HeaderInfos;