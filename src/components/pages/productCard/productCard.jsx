import React, { useState } from "react"
import http from "@utils/http"
import ReactCardFlip from "react-card-flip"
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons"

import "./productCard.sass"


const productCard = ({ 
        product, 
        isSearchProduct, 
        calories, 
        countCalories, 
        removeCalories, 
        deleteFromFavorites
    }) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const addToFavorites = (id) => {
        http.post("/user/products", id)
            .then(response => {
                setIsFlipped(prevState => !prevState.isFlipped)
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log("click")
        // setIsFlipped(prevState => !prevState.isFlipped)
    }

    return (
        <div>
            {isSearchProduct
                ? <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                    <div className="product-card front" onClick={() => addToFavorites({ "product_id": product.id })}>
                        {/* <div className="product-card front" onClick={handleClick}> */}
                        <div className="product-card-name">{product.name}</div>
                        <div className="product-card-category">{product.category}</div>
                        <div className="product-card-data">
                            <div>{product.calories} <span className="product-card-data-item">kcal</span></div>
                            <div>{product.kilojoules} <span className="product-card-data-item">kJ</span></div>
                        </div>
                    </div>

                    <div className="product-card back">
                        You have successfully added <span className="back-product-name">{product.name}</span> to favorites.
                    </div>
                </ReactCardFlip>
                : <div className="product-card front" onClick={handleClick}>
                    <PlusOutlined
                        style={{ fontSize: "20px", position: "absolute", right: 10, top: 10 }}
                        onClick={() => countCalories(product, product.id)}
                    />
                    {calories > 0
                        && <MinusOutlined
                            style={{ fontSize: "20px", position: "absolute", right: 10, top: 40 }}
                            onClick={() => removeCalories(product)}
                        />
                    }

                    <div className="product-card-name">{product.name}</div>
                    <div className="product-card-category">{product.category}</div>
                    <div className="product-card-data">
                        <div>{product.calories} <span className="product-card-data-item">kcal</span></div>
                        <div>{product.kilojoules} <span className="product-card-data-item">kJ</span></div>
                    </div>
                    <DeleteOutlined
                        style={{ fontSize: "20px", position: "absolute", right: 10, bottom: 10 }}
                        onClick={() => deleteFromFavorites({ "product_id": product.id })}
                    />
                </div>
            }
        </div>
    )
}

export default productCard
