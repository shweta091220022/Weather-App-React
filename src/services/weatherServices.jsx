import { DateTime } from "luxon";

const API_KEY = "e5214178cc4bef43944028bf934e7639";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + "forecast");
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    // console.log(data);
    return data;
  } else {
    throw new Error("Failed to fetch weather data");
  }
};

function convertOffsetToTimeZone(offsetInSeconds) {
  const hours = Math.floor(offsetInSeconds / 3600);
  const minutes = Math.floor((offsetInSeconds % 3600) / 60);
  let timezoneString = `${hours < 0 ? "-" : "+"}${Math.abs(hours)
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return `UTC${timezoneString}`;
}

const formatCurrentWeather = (data) => {
  const { weather } = data.list[0];
  const { lat, lon } = data.city.coord;
  const { temp, feels_like, temp_min, temp_max, humidity } = data.list[0].main;
  const { speed } = data.list[0].wind;
  const dt = data.list[0].dt;
  const { name, country, sunrise, sunset, timezone } = data.city;

  const { main: details, icon } = weather[0];
  const forecast = formatForecastWeather(data);
  // console.log(forecast, "a");

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    forecast,
    timezone: convertOffsetToTimeZone(timezone),
  };
};

const formatForecastWeather = (data) => {
  let { timezone } = data.city;
  let weather_data = data.list;
  weather_data.shift();
  // console.log(weather_data, "a");
  let formattedData = {};
  weather_data.forEach((item) => {
    const weekday = formatToLocalTime(
      item.dt,
      convertOffsetToTimeZone(timezone),
      "DD (ccc)"
    );

    if (!formattedData[weekday]) {
      formattedData[weekday] = [];
    }

    formattedData[weekday].push(item);
  });
  // console.log(formattedData, "a");
  // console.log(weather_data, "a");
  return formattedData;
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  return { ...formattedCurrentWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// const iconUrlFromCode = (code) =>
//   `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime };
