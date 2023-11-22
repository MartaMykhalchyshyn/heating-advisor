import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";

import "./signupPage.sass";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isValid = password !== repeatedPassword;
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const history = useHistory();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const defaultCities = [
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
  ];

  const defaultLimitTemperature = 8;

  const handleRegistration = () => {
    axios
      .post("https://course-work-beta.vercel.app/register", {
        username,
        password,
        favoriteCities: defaultCities,
        limitTemperature: defaultLimitTemperature,
      })
      .then(() => {
        history.replace("/");
      })
      .catch((error) => {
        setMessage(error.message);
        console.error("Помилка реєстрації:", error);
      });
  };
  return (
    <div className="sign-up-page">
      <div className="sign-up-page-header">Sign up</div>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
        <OutlinedInput
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="sign-in-page-item"
          startAdornment={
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="sign-in-page-item"
          type={showPassword ? "text" : "password"}
          startAdornment={
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-repeated-password">
          Repeated password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-repeated-password"
          variant="outlined"
          onChange={(e) => setRepeatedPassword(e.target.value)}
          value={repeatedPassword}
          className="sign-in-page-item"
          type={showPassword ? "text" : "password"}
          startAdornment={
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Repeated password"
        />
      </FormControl>
      <Button
        variant="contained"
        onClick={handleRegistration}
        disabled={isValid}
        type="primary"
        size={"large"}
        style={{ width: "350px", height: "50px" }}
      >
        Sign up
      </Button>
      {message}
      <div className="sign-up-page-line"></div>
      <div className="sign-up-page-link">
        Already have an account?
        <Link to="/signin" style={{ marginLeft: "10px" }}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
