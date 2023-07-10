import { useEffect, useState } from 'react';
//import TopButtons from './components/TopButtons'; //removed while changes are being made to quick search
import Inputs from './components/Inputs';
import TimeAndLoc from './components/TimeAndLoc';
import TempAndDets from './components/TempAndDets';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/WeatherService';

function App() {

  const [query, setQuery] = useState({ q:"Санкт-Петербург"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const preloadImage = src => 
  new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = src
  })

  const url = new URL(
    "https://loremflickr.com/800/1000/forest",
  );

  url.toString();

  preloadImage("https://loremflickr.com/800/1000/forest").then(()=>setIsLoaded(true))

  useEffect(()=>{
    const fetchWeather = () => {
     getFormattedWeatherData({...query, units}).then((data)=>{
          setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  
  const formatBackground = () => {
    if (!weather || !isLoaded) {
      return 'bg-gradient-to-br from-gray-400 to-gray-300'
    } else {
      if (isLoaded){
        return 'duration-1000 bg-cover bg-center bg-no-repeat bg-[url("https://loremflickr.com/800/1000/forest")]'
      }
    }
  }

  document.title = "Погода";
  
    return (
      <div
      className={`rounded-xl mx-auto max-w-screen-md
      my-3 py-5 sm:px-10 lg:px-32 h-fit
      shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
        <div
          className='backdrop-blur backdrop-brightness-90
          p-3 rounded-xl'
        >
          <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
          {weather && isLoaded && (
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
