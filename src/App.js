import { useEffect, useState } from 'react';
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

  
  const formatBackground = () => {
    if (!weather){
      return 'bg-gradient-to-br from-gray-400 to-gray-gray-300'
    } else {
      return 'bg-cover bg-center bg-no-repeat bg-[url("https://loremflickr.com/800/1000/forest")]'
    }
  }

  document.title = "Погода";

  return (
    <div
    className={`rounded-xl mx-auto max-w-screen-md my-3 py-5 px-32 h-fit
    shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <div
        className='backdrop-blur backdrop-brightness-90
        p-3 rounded-xl shadow-inner shadow-grey-400'
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
