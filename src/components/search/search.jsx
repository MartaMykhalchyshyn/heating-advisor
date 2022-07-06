import React, { useState } from "react"
import { DebounceInput } from "react-debounce-input"
import ProductCard from "@components/productCard"
import http from "@utils/http"

import "./search.sass"


const search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [noResult, setNoResult] = useState(false)

    const makeSearch = (value) => {
        http.get("/products", {
            query: value,
        })
            .then(response => {
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
                    className="search-input"
                />
                {noResult && <div className="search-message">There is no result for your search</div>}
            </div>
            <div className="search-result">
                {searchValue && searchResults.map(product => (
                    <ProductCard key={product.id} product={product} isSearchProduct />
                ))}
            </div>
        </div>
    )
}

export default search
