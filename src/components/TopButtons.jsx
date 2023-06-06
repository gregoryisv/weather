import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id:1,
            title: 'Санкт-Петербург'
        },
        {
            id:2,
            title: 'Москва'
        },
        {
            id:3,
            title: 'Хабаровск'
        },
        {
            id:4,
            title: 'Сочи'
        }
    ]
  
    return(
        <div className='flex items-center justify-around my-6'>
            {cities.map((city)  =>  (
                <button key={city.id} className="text-white text-lg font-medium
                transition ease-out hover:scale-105 "
                onClick={()=> setQuery({q: city.title})}>
                    {city.title}
                </button>
            ))}
        </div>
    )
}

export default TopButtons
