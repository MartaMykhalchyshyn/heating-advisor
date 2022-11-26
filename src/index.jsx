import ReactDOM from "react-dom";
import React from "react";

import HomePage from "./components/pages/homePage";

import "./index.sass";

ReactDOM.render(
  <div className="heating-advisor-app">
    <React.Fragment>
      <HomePage />
    </React.Fragment>
  </div>,
  document.getElementById("heating-advisor")
);
