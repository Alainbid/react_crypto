import React from "react";

const ToTop = () => {
  return (
    <div
      className="top"
      onClick={(e) => {
        window.scrollTo(0, 0);
      }}
    >
      <img src="./assets/arrow-icon.svg" alt="arrow icon" />
    </div>
  );
};

export default ToTop;
