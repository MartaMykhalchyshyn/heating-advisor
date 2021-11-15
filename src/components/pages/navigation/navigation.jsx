import React from "react"
import { NavLink } from "react-router-dom"
import "./navigation.sass"


const navigation = () => {


    return (
        <div className="navigation">
            <NavLink className="navigation-item" activeClassName="navigation-item-active" to='/home'>Home</NavLink>
            <NavLink className="navigation-item" activeClassName="navigation-item-active" to='/favorites'>Favorites</NavLink>
        </div>
    )
}

export default navigation
