import React, { useEffect } from "react";

import "./header.sass";

const Header = ({
  setCityName,
  cityName,
  selectedCityId,
  setSelectedCityId,
  clearSearch,
}) => {
  useEffect(() => {
    const selectedCityIndex = cities.findIndex(
      (city) => city.cityName === cityName
    );
    selectedCityIndex > -1
      ? setSelectedCityId(selectedCityIndex)
      : setSelectedCityId(null);
  }, [cityName]);

  const cities = [
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
    {
      id: 4,
      cityName: "Donetsk",
    },
    {
      id: 5,
      cityName: "Simferopol",
    },
  ];

  const handleClick = (cityName, cityId) => {
    setSelectedCityId(cityId);
    setCityName(cityName);
  };

  return (
    <div className="header" onClick={clearSearch}>
      {cities.map(({ cityName, id }) => (
        <button
          style={{
            color: selectedCityId === id ? "#3a86ff" : "",
          }}
          key={id}
          className="header-city"
          onClick={() => handleClick(cityName, id)}
        >
          {cityName}
        </button>
      ))}
    </div>
  );
};

export default Header;
