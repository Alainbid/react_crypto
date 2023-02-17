import React, { useState } from "react";
import { useSelector } from "react-redux";
import TableLine from "./TableLine";
import ToTop from "./ToTop";

const Table = ({ lescoinsdata }) => {
  const [rangeNumber, setRangeNumber] = useState(50);
  const [orderBy, setOrderBy] = useState("");
  const showStable = useSelector((state) => state.stableReducer);
  const showFavoris = useSelector((state) => state.listReducer);
  // console.log(lescoinsdata);
  const tableHeader = [
    "prix",
    "MktCap",
    "Volume",
    "1h",
    "1j",
    "1sem",
    "1mois",
    "6mois",
    "1an",
    "ATH",
  ];

  const excludeStable = (coinSymbol) => {
    if (
      coinSymbol === "usdt" ||
      coinSymbol === "usdc" ||
      coinSymbol === "busd" ||
      coinSymbol === "dai" ||
      coinSymbol === "ust" ||
      coinSymbol === "mim" ||
      coinSymbol === "tusd" ||
      coinSymbol === "usdp" ||
      coinSymbol === "usdn" ||
      coinSymbol === "fei" ||
      coinSymbol === "tribe" ||
      coinSymbol === "gusd" ||
      coinSymbol === "frax" ||
      coinSymbol === "lusd" ||
      coinSymbol === "husd" ||
      coinSymbol === "ousd" ||
      coinSymbol === "xsgd" ||
      coinSymbol === "usdx" ||
      coinSymbol === "eurs"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onlyFavoris = (coin) => {
    let v = false;

    // console.log(coin.symbol);
    let x = JSON.stringify(coin.symbol);
    x = `{"coinId":"` + coin.symbol + `"}`;
    // console.log(" x ", x);
    v = localStorage.getItem(x);
    // console.log("v   ", v);
    if (v != null && v === "true") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="table-container">
        <ul className="table-header">
          <div className="range-container">
            <span>
              Top{" "}
              <input
                type="text"
                value={rangeNumber}
                onChange={(e) => setRangeNumber(e.target.value)}
              />
            </span>
            <input
              type="range"
              min="1"
              max="250"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            />
            <ToTop />
          </div>
          {tableHeader.map((element) => (
            <li key={element}>
              <input
                type="radio"
                name="header-el"
                id={element}
                defaultChecked={
                  element === orderBy || element === orderBy + "reverse"
                    ? true
                    : false
                }
                onClick={() => {
                  setOrderBy("");
                  if (orderBy === element) {
                    setOrderBy(element + "reverse");
                  } else {
                    setOrderBy(element);
                  }
                }}
              />
              <label htmlFor={element}>{element}</label>
            </li>
          ))}
        </ul>
        {lescoinsdata &&
          lescoinsdata
            .slice(0, rangeNumber)
            //********************************** */
            .filter((coin) => {
              if (showFavoris) {
                if (onlyFavoris(coin)) {
                  return coin;
                }
              } else {
                return coin;
              }
            })
            //******************************* */
            .filter((coin) => {
              if (showStable) {
                return coin;
              } else {
                if (excludeStable(coin.symbol)) {
                  return coin;
                }
              }
            })
            //********************************* */
            .sort((a, b) => {
              switch (orderBy) {
                case "prix":
                  return b.current_price - a.current_price;
                case "prixreverse":
                  return a.current_price - b.current_price;
                case "MktCap":
                  return b.market_cap - a.market_cap;
                case "MktCapreverse":
                  return a.market_cap - b.market_cap;
                case "Volume":
                  return b.total_volume - a.total_volume;
                case "Volumereverse":
                  return a.total_volume - b.total_volume;
                case "1h":
                  return (
                    b.price_change_percentage_1h_in_currency -
                    a.price_change_percentage_1h_in_currency
                  );
                case "1hreverse":
                  return (
                    a.price_change_percentage_1h_in_currency -
                    b.price_change_percentage_1h_in_currency
                  );
                case "1j":
                  return (
                    b.price_change_percentage_24h_in_currency -
                    a.price_change_percentage_24h_in_currency
                  );
                case "1jreverse":
                  return (
                    a.price_change_percentage_24h_in_currency -
                    b.price_change_percentage_24h_in_currency
                  );
                case "1sem":
                  return (
                    b.price_change_percentage_7d_in_currency -
                    a.price_change_percentage_7d_in_currency
                  );
                case "1semreverse":
                  return (
                    a.price_change_percentage_7d_in_currency -
                    b.price_change_percentage_7d_in_currency
                  );
                case "1mois":
                  return (
                    b.price_change_percentage_30j_in_currency -
                    a.price_change_percentage_30j_in_currency
                  );
                case "1moisreverse":
                  return (
                    a.price_change_percentage_30d_in_currency -
                    b.price_change_percentage_30d_in_currency
                  );
                case "6mois":
                  return (
                    b.price_change_percentage_200d_in_currency -
                    a.price_change_percentage_200d_in_currency
                  );
                case "6moisreverse":
                  return (
                    a.price_change_percentage_200d_in_currency -
                    b.price_change_percentage_200d_in_currency
                  );
                case "1an":
                  return (
                    b.price_change_percentage_1y_in_currency -
                    a.price_change_percentage_1y_in_currency
                  );
                case "1anreverse":
                  return (
                    a.price_change_percentage_1y_in_currency -
                    b.price_change_percentage_1y_in_currency
                  );
                case "ATH":
                  return b.ath_change_percentage - a.ath_change_percentage;
                case "ATHreverse":
                  return a.ath_change_percentage - b.ath_change_percentage;

                default:
                  return null;
              }
            })
            .map((coin, index) => (
              <TableLine coin={coin} index={index} key={index} />
            ))}
      </div>
    </div>
  );
};

export default Table;
