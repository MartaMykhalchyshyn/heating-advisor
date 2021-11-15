import React, { useState } from "react"
import { Input, Button } from 'antd'
import { DebounceInput } from 'react-debounce-input'
import ProductCard from '@components/pages/productCard/productCard'
import http from "@utils/http"

import "./search.sass"


const search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [noResult, setNoResult] = useState(false)

    const makeSearch = (value) => {
        http.get('/products', {
            query: value
          })
        .then(response => {
            console.log(response)
            setSearchResults(response.data.data)
            !response.data.data.length && setNoResult(true)
        })
        .catch(error => {
            console.log(error)
        })
    }


    return (
        <div className="search" >
            <div>
            <DebounceInput
                minLength={3}
                debounceTimeout={300}
                onChange={(e) => makeSearch(e.target.value)}
                onKeyDown={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder="Enter a product name"
            />

            {/* <Input className="search-input" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <Button className="search-button" disabled={!searchValue} onClick={() => testSearch(searchValue)}>Search</Button> */}
            {noResult && <div>There is no result for your search, please, try something else</div>}
            </div>
            <div className="search-result">
            {searchResults.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
                {/* {searchResults.map(searchRes => (
                <div key={searchRes.id}>
                    <span>{searchRes.name} </span>  
                        <span>{searchRes.category}, </span> 
                        <span>kcal -{searchRes.calories}, </span> 
                        <span>kJ -{searchRes.kilojoules}</span> 
                </div> */}
            {/* ))} */}
           </div>
        </div>
    )
}

export default search
