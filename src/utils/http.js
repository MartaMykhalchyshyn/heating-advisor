import axios from "axios";

const host = "https://api.openweathermap.org/data";
const apiVersion = "/2.5";
const units = "units=metric";
const apiKey = "&appid=" + "8b88124e291d3021de06f049b863cccb";

function get(city, type) {
  const url = host + apiVersion + type + "?q=" + city + "&" + units + apiKey;
  return axios.get(url);
}

export default { get };
