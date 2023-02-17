import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStableState } from "../actions/stable.action";
import { setListDisplay } from "../actions/list.actions";

const TableFilters = () => {
  const [showStable, setShowStable] = useState(true);
  const [showFavList, setShowFavList] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStableState(showStable));
    dispatch(setListDisplay(showFavList));
  }, [showStable, showFavList, dispatch]);

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
        <div
          className="fav-list"
          onClick={() => {
            setShowFavList(!showFavList);
          }}
        >
          <p> {showFavList ? "Mes favoris" : "Tous les tokens"}</p>
          <img
            src={
              showFavList
                ? "../assets/star-full.svg"
                : "../assets/star-empty.svg"
            }
            alt="icon star"
          />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
