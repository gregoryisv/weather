import { useEffect, useState } from 'react';
import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLoc from './components/TimeAndLoc';
import TempAndDets from './components/TempAndDets';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/WeatherService';

function App() {

  const [query, setQuery] = useState({ q:"Санкт-Петербург"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(()=>{
    const fetchWeather = () => {
     getFormattedWeatherData({...query, units}).then((data)=>{
          setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  /*
  const formatBackground = () => {
    if (!weather) return 'from-gray-600 to-black'
    
    const hot = units === 'metric' ? 25 : 60;
    const warm = units === 'metric' ? 10 : 25;
    const cold = units === 'metric' ? -100 : 10;
    if (weather.temp < warm) return 'from-cyan-700 to-blue-700'
    //console.log(hot,warm,cold)
    if (weather.temp >= cold && weather.temp <= hot) return 'from-green-600 to-blue-800'
    
    if (weather.temp > warm) return 'from-orange-500 to-red-700'
  }*/

  document.title = "Погода";

  return (
    /*<div
    className={`rounded-xl mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit
    shadow-xl shadow-gray-400 ${formatBackground()}`}>*/
    <div
    className={`rounded-xl  mx-auto max-w-screen-md mt-4 py-5 px-32 h-fit shadow-xl shadow-gray-400
    bg-cover bg-no-repeat bg-center bg-[url("https://loremflickr.com/800/1000/landscape")]`}
    >
      <div
        className='backdrop-filter backdrop-blur-lg backdrop-brightness-80 p-3 rounded-xl'
      >
        <TopButtons setQuery={setQuery}/>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

        {weather && (
          <div>
            <TimeAndLoc weather={weather}/>
            <TempAndDets weather={weather}/>
            
            <Forecast title="Почасовой прогноз" items={weather.hourly}/>
            <Forecast title="Ежедневный прогноз" items={weather.daily}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
