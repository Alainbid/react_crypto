import React, { useState, useEffect } from "react";
import { Tooltip, Treemap } from "recharts";
import colors from "../styles/_settings.scss";

const GlobalChart = ({ lescoinsData }) => {
  const [dataArray, setDataArray] = useState([]);
  const colorPicker = (number) => {
    if (number >= 20) {
      return colors.color1;
    } else if (number >= 5) {
      return colors.green2;
    } else if (number >= 0) {
      return colors.green1;
    } else if (number >= -5) {
      return colors.red1;
    } else if (number >= -20) {
      return colors.red2;
    } else {
      return colors.black2;
    }
  };

  // on exclu les stable coins qui ne varient presque pas
  const excludeCoin = (coin) => {
    if (
      coin === "usdt" ||
      coin === "usdc" ||
      coin === "busd" ||
      coin === "dai" ||
      coin === "ust" ||
      coin === "min"
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    let chartData = [];
    // console.log("lescoinsData", lescoinsData);

    for (let i = 0; i < 12; i++) {
      if (lescoinsData.length > 0 && excludeCoin(lescoinsData[i].symbol)) {
        chartData.push({
          name:
            lescoinsData[i].symbol +
            " " +
            lescoinsData[i].market_cap_change_percentage_24h.toFixed(1) +
            "%",
          size: lescoinsData[i].market_cap,
          fill: colorPicker(lescoinsData[i].price_change_percentage_24h),
        });
      }
    }

    // console.log("chartData", chartData);
    setDataArray(chartData);
  }, [lescoinsData]);

  const active = "";
  const payload = "";

  // generation du tooltip au dessus des carrés
  const TreemapToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  // creation des carrés par cryptos
  return (
    <div className="global-chart">
      {/* <Treemap
        width={730}
        height={181}
        data={dataArray}
        dataKey="size"
        stroke="rgb(51,51,51)"
        fill="black"
        aspectRatio={1}
      >
        <Tooltip content={<TreemapToolTip />} />
      </Treemap> */}
    </div>
  );
};

export default GlobalChart;
