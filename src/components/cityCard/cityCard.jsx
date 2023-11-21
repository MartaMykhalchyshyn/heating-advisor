import React from "react";

import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import helpers from "@utils/helpers";

import "./cityCard.sass";

const CityCard = ({ cityWeather }) => {
  console.log("cityWeather", cityWeather);
  return (
    <div className="city-card">
      {cityWeather.name && (
        <div>
          <div className="city-card-main">
            <h1>
              {cityWeather.name}, {cityWeather.sys.country}
            </h1>
            {/* {selectedCityId ? (
              <button onClick={() => removeCity(selectedCityId)}>Delete</button>
            ) : null } */}
            <div className="city-card-main-details">
              <h1>{`${cityWeather.main.temp.toFixed()}°`}</h1>
              <img src={helpers.getIcon(cityWeather.weather[0].icon)} />
            </div>
          </div>

          <div className="city-card-sun-info">
            <span>
              <WbSunnyIcon />
              Sunrise: {`${helpers.formatDate(cityWeather.sys.sunrise, true)}`}
            </span>
            <span>
              <WbTwilightIcon />
              Sunset: {`${helpers.formatDate(cityWeather.sys.sunset, true)}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityCard;
