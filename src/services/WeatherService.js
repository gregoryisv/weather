import { DateTime, Settings } from "luxon";


const API_KEY = process.env.REACT_APP_OWM_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5"
const LANG = "ru"

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY, lang: LANG });
  
    return fetch(url).then((res) => res.json());
  };
  
  const formatCurrentWeather = (data) => {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;
  
    const { description: details, icon } = weather[0];
  
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
    };
  };
  
  const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(0, 7).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "ccc"),
        temp: d.temp.day,
        icon: d.weather[0].icon,
      };
    });
  
    hourly = hourly.slice(1, 10).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "HH:mm"),
        temp: d.temp,
        icon: d.weather[0].icon,
      };
    });
  
    return { timezone, daily, hourly };
  };
  
  const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);
  
    const { lat, lon } = formattedCurrentWeather;
  
    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    }).then(formatForecastWeather);
  
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  };
  
  Settings.defaultLocale = "ru";

  const formatToLocalTime = (
    secs,
    zone,
    format = "dd.MM.yy - cccc' | Местное время: 'HH:mm"
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  
  const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;
  
  export default getFormattedWeatherData;
  
  export { formatToLocalTime, iconUrlFromCode };