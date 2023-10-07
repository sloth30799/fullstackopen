import React, { useEffect, useState } from "react"
import countriesServices from "../services/countries"

const CountryDetail = ({ country }) => {
  const { name, flags, area, capital, capitalInfo } = country
  const languages = Object.entries(country.languages)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countriesServices
      .getWeather(capitalInfo[0], capitalInfo[1])
      .then((data) => setWeatherData(data.current))
  }, [capital])

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.length > 0 &&
          languages.map(([code, name]) => {
            return <li key={code}>{name}</li>
          })}
      </ul>

      <img src={flags.png} alt={flags.alt} />

      <h3>Weather in {capital[0]}</h3>
      <p>temperature - {weatherData?.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData?.weather.icon}@2x.png`}
        alt="weather icon"
      />
      <p>wind {weatherData?.wind_speed} m/s</p>
    </div>
  )
}

export default CountryDetail
