function formatDate(date, onlyHours) {
  const utcSeconds = date;
  const d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  return d.toLocaleString("ua-UA").slice(onlyHours ? 11 : 0, -3);
}

function getIcon(iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function formatChartData(responseData, type, limitTemperature) {
  const responseDataLength = type === "weather" ? 8 : responseData.length;
  const chartData = [];
  for (let i = 0; i < responseDataLength; i++) {
    chartData.push({
      "Forecast temperature": responseData[i].main.temp.toFixed(0),
      name: formatDate(responseData[i].dt),
      "Limit temperature": limitTemperature,
    });
  }
  return chartData;
}

export default { formatDate, getIcon, formatChartData };
