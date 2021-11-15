import ReactDOM from "react-dom"
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import SignIn from "./components/pages/signIn/signIn.jsx"
import SignUp from "./components/pages/signUp/signUp.jsx"
import HomePage from "./components/pages/homePage/homePage.jsx"
import FavoritesPage from "./components/pages/favoritesPage/favoritesPage.jsx"

import "./index.sass"

ReactDOM.render(
    <div className="calories-tracker-app">
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/" component={SignIn} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/favorites" component={FavoritesPage} />
                </Switch>
            </Router>
        </React.Fragment>
    </div>,
    document.getElementById("calories-tracker"),
)
