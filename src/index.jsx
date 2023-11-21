import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./components/pages/homePage";
import SigninPage from "./components/pages/signinPage";
import SignupPage from "./components/pages/signupPage";

import "./index.sass";

const root = ReactDOM.createRoot(document.getElementById("heating-advisor"));
root.render(
  <div className="heating-advisor-app">
    <React.Fragment>
      <Router>
        {/* <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/">signin</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
        </ul> */}
        <Switch>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/">
            <SigninPage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  </div>
);
