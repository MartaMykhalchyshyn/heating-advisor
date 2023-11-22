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

import "./signinPage.sass";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    axios
      .post("https://course-work-beta.vercel.app/login", { username, password })
      .then(() => {
        sessionStorage.setItem("username", username);
        history.replace("/home");
      })
      .catch((error) => {
        console.error("Помилка входу:", error);
        setMessage(error.message); // TODO: Check if its works, check styles
      });
  };
  return (
    <div className="sign-in-page">
      <div className="sign-in-page-header">Sign in</div>
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
          label="Username"
        />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-basic"
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
      <Button onClick={handleLogin} variant="contained" size={"large"}>
        Sign in
      </Button>
      {message}
      <div className="sign-in-page-link">
        Don’t have an account?
        <Link to="/signup" style={{ marginLeft: "10px" }}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SigninPage;
