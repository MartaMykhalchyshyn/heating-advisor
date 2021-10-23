import ReactDOM from "react-dom"
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import SignIn from "./components/pages/signIn/signIn.jsx"
import SignUp from "./components/pages/signUp/signUp.jsx"
import HomePage from "./components/pages/homePage/homePage.jsx"

import "./index.sass"

ReactDOM.render(
    <div className="calories-tracker-app">
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/home" component={HomePage} />
                </Switch>
            </Router>
        </React.Fragment>
    </div>,
    document.getElementById("calories-tracker"),
)
