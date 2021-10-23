import React from "react"
import axios from "axios"

import "./productCard.sass"


const productCard = ({product}) => {

    const post = (id) => {
        const url = 'https://calories-tracker-api-server.herokuapp.com/api/v1/user/products'
        const body = {'id': id}

        const headers =  {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            }
        return axios.post(url, body, { headers })
    }

    const addToFavorites = (id) => {
        console.log(id)
        post(id)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        }) 
    }
    
    
    return (
        <div className="product-card" onClick={() => addToFavorites(product.id)}>
            <div>{product.name}</div>
            <div>{product.category}</div>
            <div>{product.calories} kcal</div>
            <div>{product.kilojoules} kJ</div>
        </div>
    )
}

export default productCard
