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
      text-xl text-white cursor-pointer'>
        <p className=' transition ease-out hover:scale-105'>{details}</p>
      </div>

      <div className='flex flex-row items-center justify-between
      text-white py-3'>
        <img src= {iconUrlFromCode(icon)} alt=""
        className='W=20 transition ease-out hover:scale-110 cursor-pointer ml-3'/>
        <p className='text-5xl transition ease-out hover:scale-105 cursor-pointer'>{`${temp.toFixed()}°`}</p>
        <div className='flex flex-col space-y-2 mr-3'>
            <div className='flex font-light text-sm items-center justify-right
            transition ease-out hover:scale-105 cursor-pointer'>
                <UilTemperature size={18} className='mr-1'/>
                По ощущениям: 
                <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
            </div>
            <div className='flex font-light text-sm items-center justify-right
            transition ease-out hover:scale-105 cursor-pointer'>
                <UilTear size={18} className='mr-1'/>
                Влажность: 
                <span className='font-medium ml-1'>{`${humidity}%`}</span>
            </div>
            <div className='flex font-light text-sm items-center justify-right
            transition ease-out hover:scale-105 cursor-pointer'>
                <UilWind size={18} className='mr-1'/>
                Ветер:
                <span className='font-medium ml-1'>{`${speed} м/с`}</span>
            </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
        <UilSun />
        <p className='font-light cursor-default'>
            Восход: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'HH:mm')}</span>
        </p>
        <p className='font-light cursor-default'>|</p>
        <UilSunset />
        <p className='font-light cursor-default'>
            Закат: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'HH:mm')}</span>
        </p>
        <p className='font-light cursor-default'>|</p>
        <UilArrowUp />
        <p className='font-light cursor-default'>
            До: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className='font-light cursor-default'>|</p>
        <UilArrowDown />
        <p className='font-light cursor-default'>
            От: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  )
}

export default TempAndDets
