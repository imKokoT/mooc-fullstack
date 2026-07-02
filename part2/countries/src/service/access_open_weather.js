import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_API_KEY

function fetch(capital) {
  const request = axios.get(`${baseUrl}?appid=${api_key}&q=${capital}`)
  return request.then(response => response.data)
}

function getWeather(weatherObject){
  return {
    temp: (weatherObject.main.temp - 273.15).toFixed(1),
    wind: `${weatherObject.wind.speed} m/s at ${weatherObject.wind.deg} degrees`,
    icon: `https://openweathermap.org/payload/api/media/file/${weatherObject.weather[0].icon}.png`
  }
}

export default { 
    fetch,
    getWeather
}
