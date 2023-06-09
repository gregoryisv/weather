import React from 'react'
import { iconUrlFromCode} from '../services/WeatherService'

function Forecast({title, items}) {
  return (
    <div className='mx-4'>
        <div className='flex items-center justify-start mt-6 '>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-1'/>

        <div className='flex flex-row items-center justify-between text-white mb-6'>
            {items.map(item =>(
                <div className='flex flex-col items-center justify-center
                transition ease-out hover:scale-105 cursor-pointer'>
                    <p className='font-light text-sm'>
                        {item.title}
                    </p>
                    <img src={iconUrlFromCode(item.icon)} className='w-12 my-1' alt="" />
                    <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Forecast
