import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import ProductCard from '@components/pages/productCard/productCard'
import Navigation from '@components/pages/navigation/navigation'
import http from "@utils/http"
import { DatePicker, Button } from 'antd'



import "./favoritesPage.sass"


const favoritesPage = () => {
    const [favorites, setFavorites] = useState([])
    const [calories, setCalories] = useState(0)
    const [kilojoules, setKilojoules] = useState(0)
    const [selectedDate, setSelectedDate] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        getFavorites()
    }, [])

    const getFavorites = () => {
        http.get('/user/products')
        .then(response => {
            console.log(response.data.data.products)
            setFavorites(response.data.data.products)
        })
        .catch(error => {
            console.log(error.response)
        }) 
    }
   
    const deleteFromFavorites = (id) => {
        http.delete('/user/products', id)
        .then(response => {
            console.log(response)
            getFavorites()
        })
        .catch(error => {
            console.log(error.response)
        }) 
    }

    const countCalories = (favorite) => {
        setCalories((prev) => prev + favorite.calories)
        setKilojoules((prev) => prev + favorite.kilojoules)
    }    
    

    const onChange = (date, dateString) => {
        setSelectedDate(() => dateString.replace(/-/g, '.'))
    }

    const test = () => {
        console.log(selectedDate)
    }

    const postDailyCalories = (data) => {
        http.post('/user/calories', data)
        .then(response => {
            console.log(response)
            setMessage(response.data.message)
        })
        .catch(error => {
            console.log(error.response)
        }) 
    }

    const getDailyCalories = (date) => {
        http.get('/user/calories', {
            start_date: date,
            end_date: date,
          })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        }) 
    }

    const logout = () => {
        localStorage.clear()
        window.location.href = '/signin'
    }

    return (
        <div className="favorites-page" >
            <div className="header"> 
                <Navigation />
                <button onClick={logout}>logout</button>
            </div>
            <div>
                <DatePicker onChange={onChange} />
                <Button disabled={!selectedDate} onClick={() => postDailyCalories({ 'calories': calories, 'kilojoules': kilojoules, 'date': selectedDate })}>Save calories</Button>
                {message}
                <Button disabled={!selectedDate} onClick={() => getDailyCalories(selectedDate)}>Get calories</Button>
            </div>
            <div className="favorites-page-list">
                {!favorites.length && <div>Your favorites list is empty</div>}
                {favorites.map(favorite => (
                    <div>
                        <ProductCard key={favorite.id} product={favorite} countCalories={countCalories} />
                        {/* <Button onClick={() => countCalories(favorite)}>Count</Button> */}
                        <Button onClick={() => deleteFromFavorites({ 'product_id': favorite.id })}>Delete</Button>
                    </div>
                ))}
            </div>
            <div>Today calories: {calories}</div>
            <div>Today kilojoules: {kilojoules}</div>
        </div>
    )
}

export default favoritesPage
