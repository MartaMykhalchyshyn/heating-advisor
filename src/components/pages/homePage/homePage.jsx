import React, { useState, useEffect } from "react";

import CityCard from "@components/cityCard";
import Header from "@components/header";
import Search from "@components/search";
import Chart from "@components/chart";
import Alert from "@components/alert";

import http from "@utils/http";
import helpers from "@utils/helpers";

import "./homePage.sass";

const HomePage = () => {
  const [cityName, setCityName] = useState("Lviv");
  const [cityWeather, setCityWeather] = useState(null);
  const [chartDailyData, setChartDailyData] = useState([]);
  const [chartWeeklyData, setChartWeeklyData] = useState([]);
  const [currentMinTemperature, setCurrentMinTemperature] = useState(undefined);
  const [currentMaxTemperature, setCurrentMaxTemperature] = useState(undefined);

  const [errorMessage, setErrorMessage] = useState("no data provided");
  const [selectedCityId, setSelectedCityId] = useState(0);

  useEffect(() => {
    getCurrentCityWeather(cityName);
    getWeeklyForecast(cityName);

    setChartDailyData([]); 
    setChartWeeklyData([]); 
  }, [cityName]);

  const getCurrentCityWeather = (cityName) => {
    http
      .get(cityName, "/weather")
      .then((response) => {
        setCityWeather(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const getWeeklyForecast = (cityName) => {
    http
      .get(cityName, "/forecast")
      .then((response) => {
        setErrorMessage("");
        setCurrentMinTemperature(
          Math.min(
            response.data.list[0].main.temp,
            response.data.list[1].main.temp
          ).toFixed(0)
        );
        setCurrentMaxTemperature(
          Math.max(
            response.data.list[0].main.temp,
            response.data.list[1].main.temp
          ).toFixed(0)
        );
        setChartDailyData(
          helpers.formatChartData(response.data.list, "weather")
        );
        setChartWeeklyData(
          helpers.formatChartData(response.data.list, "forecast")
        );
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="home-page">
      <Header
        setCityName={setCityName}
        cityName={cityName}
        selectedCityId={selectedCityId}
        setSelectedCityId={setSelectedCityId}
      />
      <Search setCityName={setCityName} selectedCityId={selectedCityId} />

      <div className="city-weather">
        {!errorMessage && cityWeather?.name ? (
          <CityCard cityWeather={cityWeather} />
        ) : (
          <p className="error-info">{errorMessage}</p>
        )}
      </div>

      <h4 className="chart-header">Daily forecast</h4>
      <div className="chart-wrapper">
        <Chart chartData={chartDailyData} />
      </div>

      <h4 className="chart-header">Weekly forecast</h4>
      <div className="chart-wrapper">
        <Chart chartData={chartWeeklyData} weekly />
      </div>

      <Alert
        cityWeather={cityWeather}
        currentMinTemperature={currentMinTemperature}
        currentMaxTemperature={currentMaxTemperature}
      />
    </div>
  );
};

export default HomePage;
