import axios from "axios";

const host = "https://api.openweathermap.org/data";
const apiVersion = "/2.5";
const units = "units=metric";
const api_key = "&appid=" + "8b88124e291d3021de06f049b863cccb";

function get(city, type) {
  const url = host + apiVersion + type + "?q=" + city + "&" + units + api_key;
  return axios.get(url);
}

export default { get };
