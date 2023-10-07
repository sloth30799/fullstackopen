import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
const api_key = import.meta.env.VITE_API_KEY

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then((response) => response.data)
}

const getOne = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`)
  return request.then((response) => response.data)
}

const getWeather = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,daily,alerts&appid=${api_key}`
  )

  return request.then((response) => response.data)
}

export default {
  getAll,
  getOne,
  getWeather,
}
