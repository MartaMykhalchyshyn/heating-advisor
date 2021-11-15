import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import ProductCard from '@components/pages/productCard/productCard'
import http from "@utils/http"

import "./searchResult.sass"
// import e from "express"


const SearchResult = ({ searchResults, a }) => {
   
    console.log(searchResults)
    return (
        <div className="search-result" >
            <p>{a}</p>
           {searchResults.map(searchRes => (
               <div>
                    <div>{searchRes.name}</div>  
                    <div>{searchRes.category}</div> 
                    <div>{searchRes.calories}</div> 
                    <div>{searchRes.kilojoules}</div> 
               </div>
           ))}
        </div>
    )
}

export default SearchResult
