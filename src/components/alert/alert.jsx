import React, { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = ({
  cityWeather,
  limitTemperature,
  currentMinTemperature,
  currentMaxTemperature,
}) => {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    if (cityWeather && cityWeather.cod === 200) {
      if (
        cityWeather?.main.temp < limitTemperature
        || currentMinTemperature < limitTemperature
      ) {
        setAlertMessage(
          `Warning! Temperature is going to be below ${limitTemperature}°! Prepare to turn on heating!`
        );
        setAlertType("warning");
        setOpen(true);
      }
      if (cityWeather?.main.temp >= limitTemperature || currentMaxTemperature >= limitTemperature) {
        setAlertMessage(
          `Warning! Temperature is going to be above ${limitTemperature}°! Prepare to turn off heating!`
        );
        setAlertType("success");
        setOpen(true);
      }
    }
  }, [cityWeather]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          key={"top" + "center"}
        >
          <Alert
            onClose={handleClose}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default CustomizedSnackbars;
