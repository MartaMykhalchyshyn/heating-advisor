import React, { useState, useEffect } from "react"
import ProductCard from '@components/pages/productCard/productCard'
import Navigation from '@components/pages/navigation/navigation'
import Search from '@components/pages/search/search'
import http from "@utils/http"

import "./homePage.sass"


const HomePage = () => {
    const [allProducts, setAllProducts] = useState([])
    

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        http.get('/products')
        .then(response => {
            console.log(response.data.data)
            setAllProducts(response.data.data)
        })
        .catch(error => {
            console.log(error.response)
        })     
    }

    

    
    return (
        <div className="home-page">
            <Navigation />
            {/* <button onClick={getProducts}>random products</button>  */}
            <Search />
            
            <div className="home-page-list">
                {allProducts.map(product => (
                    <ProductCard key={product.id} product={product} isSearchProduct={true}/>
                ))}
            </div>
        </div>
    )
}

export default HomePage
