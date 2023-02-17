import { combineReducers } from "redux";
import stableReducer from "./stable.reducer";
import listReducer from "./list.reducers";

export default combineReducers({
  stableReducer,

  listReducer,
});
