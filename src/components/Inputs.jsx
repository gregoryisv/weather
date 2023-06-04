import React, { useState } from 'react'
import { UilTelescope, UilCompass  } from '@iconscout/react-unicons'

function Inputs({setQuery, units, setUnits}) {

  const [city, setCity] = useState("");

  const handlerSearchClick = () =>{
    if (city !== '') setQuery({q:city});
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (city !== '') setQuery({q:city});
    }
  };

  const handleLocationClick = () =>{
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({lat, lon})
      })
    }
  }

  const handleUnitSwap = (e) =>{
    const selectedUnit = e.currentTarget.name
    if (units !== selectedUnit) setUnits(selectedUnit);
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className=" flex flex-row w-3/4 items-center justify-start space-x-4">
        
        <input
        id="search"
        value={city}
        onChange={(e)=> setCity(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder='Поиск...'
        className="ml-4 rounded-md text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize"
        />
        
        <UilTelescope
        size={30}
        className="text-white cursor-pointer transition ease-out hover:scale-110"
        onClick={handlerSearchClick}
        />
        
        <UilCompass 
        size={30} 
        className="text-white cursor-pointer transition ease-out hover:scale-110"
        onClick={handleLocationClick}
        /> 
      </div>

      <div className=' flex flex-row w-1/4 items-center justify-end mr-4'>
            <button
                name="metric"
                className='text-xl text-white font-light transition ease-out hover:scale-110'
                onClick={handleUnitSwap}
            >°C</button>

            <p className='text-xl text-white mx-1 '>|</p>

            <button
                name="imperial"
                className='text-xl text-white font-light transition ease-out hover:scale-110'
                onClick={handleUnitSwap}
            >°F</button>
      </div>
    </div>
  )
}

export default Inputs
