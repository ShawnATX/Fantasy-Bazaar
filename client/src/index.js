import React from "react";
import ReactDOM from "react-dom";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 4000,
  offset: "5px",
  transition: "fade",
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
