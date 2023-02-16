import React, { useEffect, useState } from "react";
import colors from "../styles/_settings.scss";


const PercentageChange = ({ percent }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    if (percent) {
      if (percent < 0) {
        setColor(colors.red2);
      } else {
        setColor(colors.green1);
      }
    } else {
      setColor(colors.white1);
    }
  }, [percent]);

  return (
    <span className="percen-change-container" style={{ color: color }}>
      {percent ? "         " + percent.toFixed(1) + "%" : "-"}
    </span>
  );
};

export default PercentageChange;

// market_cap_change_percentage_24h_usd
