import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./styles/index.scss";

import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
