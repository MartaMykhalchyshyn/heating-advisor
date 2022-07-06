import React, { useState, useEffect } from "react"
import ProductCard from "@components/productCard"
import Header from "@components/header"
import Search from "@components/search"
import http from "@utils/http"

import "./homePage.sass"


const HomePage = () => {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        http.get("/products")
            .then(response => {
                setAllProducts(response.data.data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    return (
        <div className="home-page">
            <Header />
            <Search />
            <div className="home-page-list">
                {allProducts.map(product => (
                    <ProductCard key={product.id} product={product} isSearchProduct />
                ))}
            </div>
        </div>
    )
}

export default HomePage
