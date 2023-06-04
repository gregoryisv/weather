import React from 'react'
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from '@iconscout/react-unicons'
import { iconUrlFromCode, formatToLocalTime  } from '../services/WeatherService'

function TempAndDets({weather: {
  details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone
}}) {
  return (
    <div>
      <div className='flex items-center justify-center py-6
      text-xl text-white'>
        <p>{details}</p>
      </div>

      <div className='flex flex-row items-center justify-between
      text-white py-3'>
        <img src= {iconUrlFromCode(icon)} alt=""
        className='W=20'/>
        <p className='text-5xl transition ease-out hover:scale-110'>{`${temp.toFixed()}°`}</p>
        <div className='flex flex-col space-y-2'>
            <div className='flex font-light text-sm items-center justify-right'>
                <UilTemperature size={18} className='mr-1'/>
                По ощущениям: 
                <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
            </div>
            <div className='flex font-light text-sm items-center justify-right'>
                <UilTear size={18} className='mr-1'/>
                Влажность: 
                <span className='font-medium ml-1'>{`${humidity}%`}</span>
            </div>
            <div className='flex font-light text-sm items-center justify-right'>
                <UilWind size={18} className='mr-1'/>
                Ветер:
                <span className='font-medium ml-1'>{`${speed} м/с`}</span>
            </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
        <UilSun />
        <p className='font-light'>
            Восход: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'HH:mm')}</span>
        </p>
        <p className='font-light'>|</p>
        <UilSunset />
        <p className='font-light'>
            Закат: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'HH:mm')}</span>
        </p>
        <p className='font-light'>|</p>
        <UilArrowUp />
        <p className='font-light'>
            До: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className='font-light'>|</p>
        <UilArrowDown />
        <p className='font-light'>
            От: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  )
}

export default TempAndDets
