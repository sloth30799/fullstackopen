import React, { useEffect, useState } from "react"
import countriesServices from "./services/countries"
import CountriesResult from "./components/CountriesResult"
import CountryDetail from "./components/CountryDetail"

const App = () => {
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countriesServices.getAll().then((data) => setCountries(data))
  }, [])

  const handleChange = (event) => {
    const results = countries.filter((c) =>
      c.name.common.toLowerCase().includes(event.target.value)
    )

    setCountry(null)
    setResult(results)
    if (results.length === 1) setCountry(results[0])
  }

  const handleClick = (name) => {
    const newCountry = result.find((c) => c.name.common === name)
    setCountry(newCountry)
  }

  return (
    <div>
      <span>find countries</span>
      <input type="text" aria-label="country-search" onChange={handleChange} />
      {result.length > 1 && (
        <CountriesResult result={result} handleClick={handleClick} />
      )}
      {country && <CountryDetail country={country} />}
    </div>
  )
}

export default App
