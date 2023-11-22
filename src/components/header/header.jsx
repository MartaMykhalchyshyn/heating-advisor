import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import axios from "axios";

import "./header.sass";

const Header = ({
  setCityName,
  cityName,
  selectedCityId,
  setSelectedCityId,
  clearSearch,
  favoriteCities,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userLimit, setUserLimit] = useState(null);

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const selectedCityIndex
      = favoriteCities
      && favoriteCities.findIndex((city) => city.cityName === cityName);
    console.log("favoriteCities", favoriteCities, cityName);
    console.log("selectedCityIndex", selectedCityIndex);
    selectedCityIndex > -1
      ? setSelectedCityId(selectedCityIndex)
      : setSelectedCityId(null);
  }, [cityName, favoriteCities]);

  const changeSavedCity = (cityName, cityId) => {
    setSelectedCityId(cityId);
    setCityName(cityName);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleLimit = () => {
    const username = sessionStorage.getItem("username");
    axios
      .patch("https://course-work-beta.vercel.app/updateLimitTemperature", {
        username,
        limitTemperature: userLimit,
      })
      .then(() => {
        getUserData(username);
        setUserLimit("");
      })
      .catch((error) => {
        console.error("Помилка зміни порогу температури:", error);
      });
  };

  return (
    <div className="header" onClick={clearSearch}>
      <div className="header-cities">
        {favoriteCities
          && favoriteCities.map(({ cityName, id }) => (
            <div key={id}>
              <button
                style={{
                  color: selectedCityId === id ? "#3a86ff" : "",
                }}
                className="header-city"
                onClick={() => changeSavedCity(cityName, id)}
              >
                {cityName}
              </button>
            </div>
          ))}
      </div>
      <div>
        <AccountCircleIcon
          fontSize="large"
          style={{ width: 50, height: 50 }}
          aria-describedby={id}
          onClick={handleClickPopover}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="header-popover">
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-limit">Limit</InputLabel>
              <OutlinedInput
                id="outlined-adornment-limit"
                variant="outlined"
                onChange={(e) => setUserLimit(e.target.value)}
                value={userLimit}
                label="Limit"
              />
            </FormControl>
            <Button
              onClick={handleLimit}
              variant="contained"
              className="header-button"
              size={"large"}
            >
              Update limit
            </Button>
            <Typography
              sx={{ p: 2 }}
              className="header-logout"
              onClick={logout}
            >
              Logout
            </Typography>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
