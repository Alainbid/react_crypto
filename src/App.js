import axios from "axios";
import React, { useEffect, useState } from "react";
import GlobalChart from "./components/GlobalChart.js";
import HeaderInfos from "./components/HeaderInfos.js";
import Table from "./components/Table.js";
import ToTop from "./components/ToTop.js";

const App = () => {
  const [coinsData, setCoinsdata] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
      )
      .then((res) => {
        setCoinsdata(res.data);
      });
    //*******  pour laisser apparaitre la navbar quand on scroll vers le bas */
    window.addEventListener("scroll", () => {
      if (window.scrollY > 145) {
        document.querySelector(".table-header").classList.add("active");
      } else {
        document.querySelector(".table-header").classList.remove("active");
      }
    });
  }, []);

  return (
    <div className="app-container">
      <header>
        <HeaderInfos />
        {/* <GlobalChart lescoinsData={coinsData} /> */}
        <Table lescoinsdata={coinsData} />
        <ToTop />
        {/* on passe les coins data en props  à globalChart*/}
      </header>
    </div>
  );
};

export default App;
