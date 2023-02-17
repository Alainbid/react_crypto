import React, { useState } from "react";
import CoinChart from "./CoinChart";
import PercentageChange from "./PercentageChange";
import StarIcon from "./StarIcon";

const TableLine = ({ coin, index }) => {
  const [showChart, setShowChart] = useState(false);
  const priceFormater = (prix) => {
    if (Math.round(prix).toString().length < 4) {
      return new Intl.NumberFormat("us-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 7,
      }).format(prix);
    } else {
      return prix;
    }
  };

  const marketCapFormater = (coin) => {
    let x = parseFloat(coin / 1000000000);
    // x = x.toFixed(1);
    return x.toLocaleString("de-DE");
  };

  return (
    <div className="table-line">
      <div className="infos-container">
        <StarIcon coinId={coin.symbol} />
        {/* //**************************** on retourne le symbol */}
        <p>{index + 1}</p>
        <div className="img">
          <img src={coin.image} height="20" alt="logo" />
        </div>
        <div className="infos">
          <div
            className="chart-img"
            onMouseEnter={() => setShowChart(true)}
            onMouseLeave={() => setShowChart(false)}
          >
            <img src="./assets/chart-icon.svg" alt="icon" />
            <div className="chart-container" id={coin.name}>
              {showChart && <CoinChart coinId={coin.id} coinName={coin.name} />}
            </div>
          </div>
          <h4>{coin.name}</h4>
          <span>- {coin.symbol.toUpperCase()}</span>
          <a
            href={
              "https://www.coingecko.com/fr/pi%C3%A8ces/" +
              coin.name.toLowerCase().replace(" ", "-").replace(" ", "-")
            }
            target="_blank"
            rel="noreferrer"
          >
            <img src="./assets/info-icon.svg" alt="info" />
          </a>
        </div>
      </div>
      <p>{priceFormater(coin.current_price).toLocaleString("de-DE")} $</p>
      <p className="mktcap">{marketCapFormater(coin.market_cap)} Md$</p>
      <p>{parseInt(coin.total_volume / 1000000).toLocaleString("de-DE")} m$</p>
      <PercentageChange percent={coin.price_change_percentage_1h_in_currency} />
      <PercentageChange
        percent={coin.price_change_percentage_24h_in_currency}
      />
      <PercentageChange percent={coin.price_change_percentage_7d_in_currency} />
      <PercentageChange
        percent={coin.price_change_percentage_30d_in_currency}
      />
      <PercentageChange
        percent={coin.price_change_percentage_200d_in_currency}
      />
      <PercentageChange percent={coin.price_change_percentage_1y_in_currency} />
      <PercentageChange percent={coin.ath_change_percentage} />
    </div>
  );
};

export default TableLine;
