import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Input, Button } from 'antd'
import ProductCard from '@components/pages/productCard/productCard'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import axios from "axios"
import request from "@utils/request"

import "./homePage.sass"


const HomePage = () => {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const get = () => {
        const url = 'https://calories-tracker-api-server.herokuapp.com/api/v1/products'

        const headers =  {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            }
        return axios.get(url)
    }


    const getProducts = () => {
        get()
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
            <div>You are on Home page</div>
            <button onClick={getProducts}>random products</button> 
            {allProducts.map(product => (
                <ProductCard product={product}/>
            ))}
        </div>
    )
}

export default HomePage
