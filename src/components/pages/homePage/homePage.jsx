import React, { useState, useEffect } from "react";

import CityCard from "@components/cityCard";
import Header from "@components/header";
import Search from "@components/search";
import Chart from "@components/chart";
import Alert from "@components/alert";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

import http from "@utils/http";
import helpers from "@utils/helpers";
import axios from "axios";

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

  const [userFavoriteCities, setUserFavoriteCities] = useState([
    {
      id: 0,
      cityName: "Lviv",
    },
    {
      id: 1,
      cityName: "Kyiv",
    },
    {
      id: 2,
      cityName: "Kharkiv",
    },
    {
      id: 3,
      cityName: "Kherson",
    },
  ]);
  const [limitTemperature, setlimitTemperature] = useState(8);

  const isCitySaved = userFavoriteCities.some(
    (item) => item.cityName === cityName
  );

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    getUserData(username);
  }, []);

  useEffect(() => {
    getCurrentCityWeather(cityName);
    getWeeklyForecast(cityName);

    setChartDailyData([]);
    setChartWeeklyData([]);
  }, [cityName, limitTemperature]);

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

  const getUserData = (username) => {
    axios
      .get(`https://course-work-beta.vercel.app/userData/${username}`)
      .then((response) => {
        console.log("responseresponseresponseresponseresponse", response);
        setUserFavoriteCities(response.data.favoriteCities);
        setlimitTemperature(response.data.limitTemperature);
      })
      .catch((error) => console.log("error", error));
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
          helpers.formatChartData(
            response.data.list,
            "weather",
            limitTemperature
          )
        );
        setChartWeeklyData(
          helpers.formatChartData(
            response.data.list,
            "forecast",
            limitTemperature
          )
        );
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const removeCity = (selectedCityId) => {
    const username = sessionStorage.getItem("username");
    axios
      .delete("https://course-work-beta.vercel.app/removeCity", {
        data: { username, selectedCityId },
      })
      .then(() => {
        getUserData(username);
      })
      .catch((error) => {
        console.error("Помилка видалення міста:", error);
      });
  };

  const addCity = (cityName) => {
    const username = sessionStorage.getItem("username");
    axios
      .post("https://course-work-beta.vercel.app/addCity", { username, cityName })
      .then(() => {
        getUserData(username);
      })
      .catch((error) => {
        console.error("Помилка додавання міста:", error);
      });
  };

  return (
    <div className="home-page">
      <Header
        setCityName={setCityName}
        cityName={cityName}
        selectedCityId={selectedCityId}
        setSelectedCityId={setSelectedCityId}
        favoriteCities={userFavoriteCities}
      />
      <Search setCityName={setCityName} selectedCityId={selectedCityId} />

      <div className="city-weather">
        {!errorMessage && cityWeather?.name ? (
          <>
            <CityCard
              cityWeather={cityWeather}
              selectedCityId={selectedCityId}
            />
            {isCitySaved ? (
              <BookmarkAddedIcon onClick={() => removeCity(selectedCityId)} />
            ) : (
              <BookmarkAddIcon onClick={() => addCity(cityName)} />
            )}
          </>
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
