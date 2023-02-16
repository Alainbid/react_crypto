import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStableState } from "../actions/stable.action";
const onlyFavoris = (image) => {};

const TableFilters = () => {
  const [showStable, setShowStable] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStableState(showStable));
  }, [showStable, dispatch]);

  return (
    <div className="table-filters">
      <div className="table-filters-container">
        <div className="avec-coin">
          <input
            type="checkbox"
            id="stableCoin"
            defaultChecked={true}
            onClick={() => setShowStable(!showStable)}
          />
          <label htmlFor="stableCoin">
            {showStable ? " Avec stable coin" : "  Sans stable coin"}
          </label>
        </div>
        <div className="no-list-btn">
          <p>Auncune liste</p>
        </div>
        <div className="fav-list">
          <p>Liste des favoris</p>
          <img
            src="../assets/star-full.svg"
            alt="icon star"
            onClick={onlyFavoris("../assets/star-full.svg")}
          />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
