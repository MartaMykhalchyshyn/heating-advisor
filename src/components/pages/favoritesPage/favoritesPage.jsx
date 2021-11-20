import React, { useState, useEffect } from "react"
import ProductCard from '@components/pages/productCard/productCard'
import Header from '@components/pages/header/header'
import Chart from '@components/pages/chart/chart'
import { Badge } from 'antd';
import http from "@utils/http"
import { DatePicker, Button } from 'antd'



import "./favoritesPage.sass"


const favoritesPage = () => {
    const [favorites, setFavorites] = useState([])
    const [calories, setCalories] = useState(0)
    const [kilojoules, setKilojoules] = useState(0)
    const [selectedDate, setSelectedDate] = useState('')
    const [message, setMessage] = useState('')
    const [eatenToday, setEatenToday] = useState(false)
    const [eatenProducts, setEatenProducts] = useState(0)
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        getFavorites()
        getDailyCalories()
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

    const countCalories = (favorite, id) => {
        setCalories((prev) => prev + favorite.calories)
        setKilojoules((prev) => prev + favorite.kilojoules)
        setEatenToday((prev) => !prev)
        setEatenProducts(prev => prev + 1)
       
    }    

    const removeCalories = (favorite, id) => {
        setCalories((prev) => prev - favorite.calories)
        setKilojoules((prev) => prev - favorite.kilojoules)
        setEatenToday((prev) => !prev)
        setEatenProducts(prev => prev - 1)
    } 
    

    const onChange = (date, dateString) => {
        setSelectedDate(() => dateString.replace(/-/g, '.'))
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

    const getDailyCalories = () => {
        http.get('/user/calories')
        .then(response => {
            console.log(response)
            setChartData(response.data.data.calories)
        })
        .catch(error => {
            console.log(error.response)
        }) 
    }

    // const getMonthCalories = () => {
    //     let today = new Date();
    //     let c = today.toISOString().split('T')[0]

    //     let monthAgo = new Date();
    //     monthAgo.setMonth(monthAgo.getMonth() - 1);
    //     let b = monthAgo.toISOString().split('T')[0]
    //     http.get('/user/calories', {
    //         start_date: b,
    //         end_date: c,
    //       })
    //     .then(response => {
    //         console.log(response)
    //         setChartData(response.data.data.calories)
    //     })
    //     .catch(error => {
    //         console.log(error.response)
    //     }) 
    // }

    return (
        <div className="favorites-page" >
                <Header />
            <div>
                <DatePicker onChange={onChange} />
                <Button disabled={!selectedDate} onClick={() => postDailyCalories({ 'calories': calories, 'kilojoules': kilojoules, 'date': selectedDate })}>Save calories</Button>
                {message}
                <Button  onClick={() => getDailyCalories()}>Get calories</Button>
            </div>
            <div className="favorites-page-list">
                {!favorites.length && <div>Your favorites list is empty</div>}
                {favorites.map(favorite => (
                    <div key={favorite.id}>
                        <ProductCard  product={favorite} countCalories={countCalories} removeCalories={removeCalories} deleteFromFavorites={deleteFromFavorites} eatenToday={eatenToday}/>
                        {/* <Button onClick={() => countCalories(favorite)}>Count</Button> */}
                        {/* <Button onClick={() => deleteFromFavorites({ 'product_id': favorite.id })}>Delete</Button> */}
                    </div>
                ))}
            </div>
            <Badge count={eatenProducts} showZero>
                <p style={{paddingRight: 10, fontSize: '20px'}}>Today products</p>
            </Badge>
            <div>Today calories: {calories}</div>
            <div>Today kilojoules: {kilojoules}</div>
            <Chart chartData={chartData} />
        </div>
    )
}

export default favoritesPage
