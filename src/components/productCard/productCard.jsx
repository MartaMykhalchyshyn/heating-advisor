import React, { useState } from "react"
import http from "@utils/http"
import ReactCardFlip from "react-card-flip"
import Dialog from "@components/dialog"
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons"

import "./productCard.sass"


const productCard = ({
    product,
    isSearchProduct,
    countCalories,
    removeCalories,
    deleteFromFavorites,
    eatenToday,
}) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
        deleteFromFavorites({ "product_id": product.id })
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const addToFavorites = (id) => {
        http.post("/user/products", id)
            .then(() => {
                setIsFlipped(prevState => !prevState.isFlipped)
            })
            .catch(error => {
                console.log(error.response)
            })
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
                : <div className="product-card front">
                    <PlusOutlined
                        style={{ fontSize: "20px", position: "absolute", right: 10, top: 10 }}
                        onClick={() => countCalories(product, product.id)}
                    />
                    {eatenToday.includes(product.id)
                        && <MinusOutlined
                            style={{ fontSize: "20px", position: "absolute", right: 10, top: 40 }}
                            onClick={() => removeCalories(product, product.id)}
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
                        onClick={showModal}
                    />
                    <Dialog
                        isModalVisible={isModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        product={product}
                    />
                </div>
            }
        </div>
    )
}

export default productCard
