import ReactDOM from "react-dom"
import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import SignIn from "./components/pages/signIn"
import SignUp from "./components/pages/signUp"
import HomePage from "./components/pages/homePage"
import FavoritesPage from "./components/pages/favoritesPage"

import "./index.sass"

ReactDOM.render(
    <div className="calories-tracker-app">
        <React.Fragment>
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/signin" />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/favorites" component={FavoritesPage} />
                </Switch>
            </Router>
        </React.Fragment>
    </div>,
    document.getElementById("calories-tracker"),
)
