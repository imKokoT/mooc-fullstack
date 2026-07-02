import { 
  useState,
  useEffect
} from 'react'
import CountriesService from './service/access_countries'
import WeatherService from './service/access_open_weather'

const MAX_RESULTS = 10


function CountryDetails({country}) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log(`fetching weather of ${country.capital}...`)

    WeatherService.
      fetch(country.capital)
      .then(weather => {
        setWeather(weather)
        console.log(weather)
      })
      .catch(error => {
        console.error('failed to fetch weather')
        setWeather({})
      })
  }, [])
  
  if (!weather) 
    return

  const {temp, wind, icon} = WeatherService.getWeather(weather)

  let weatherInfo = <p>No information...</p>
  if (Object.keys(weather).length !== 0)
    weatherInfo = (
      <p>
        Temperature: {temp} Celsius
        <br />
        Wind: {wind} m/s at {weather.wind.deg} degrees
        <br />
        <img src={icon}/>
      </p>
    )

  return (
    <div>
      <h2>{country.name.common}</h2>

      <h3>Base information</h3>
      <p>
        Capital: {country.capital}
        <br />
        Area: {country.area}
      </p>
      <img src={country.flags.svg} alt={country.flag} />

      <h3>Languages</h3>
      <ol>
        {Object.values(country.languages).map(v => <li key={v}>{v}</li>)}
      </ol>

      <h3>Weather in the capital</h3>
      {weatherInfo}
    </div>
  )
}

function CountryElement({country, setFiltered}) {
  const [show, setShow] = useState(null)

  const showDetails = event => {
    setFiltered([country])
  }

  return (
    <li>
      {country.name.common} <button onClick={showDetails}>Show details</button>
    </li>
  )
}

function Results({query, countries}) {
  const [filtered, setFiltered] = useState(null)
  
  useEffect(() => {
    if (!countries)
      return

    // simple and effective search, works even with countries
    // like Sudan and South Sudan. maybe i had to implement
    // search within regex patterns but i think it's not required
    // for this small search set of 250 countries.
    setFiltered(
      countries.filter(c => c.name.common
        .toLowerCase()
        .startsWith(
          query.toLowerCase()
        )
    )
  )
  }, [query])
  
  if (!query)
    return <div>...</div>

  if (!filtered)
    return

  // to many
  if (filtered.length > MAX_RESULTS)
    return <div>Too many results</div>
  // up to MAX_RESULTS results
  else if (filtered.length > 1)
    return (
      <div>
        <ul>
          {filtered.map(c => <CountryElement key={c.name.common} country={c} setFiltered={setFiltered}/>)}
        </ul>
      </div>
    )
  // single
  else if (filtered.length === 1)
    return (
      <div>
        <CountryDetails country={filtered[0]}/>
      </div>
    )
  // no results
  else
    return <div>No search results...</div>
}

function App() {
  const [searchQuery, setSearch] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    console.log('fetching countries')

    CountriesService
      .getAll()
      .then(data => {
        setCountries(data)
        console.log(`fetched ${data.length} countries in total`)
      })
      .catch(error => {
        console.error(`failed to fetch countries`)
      })
  }, [])

  if (!countries)
    return <div>An error occurred while fetch data about countries</div>

  const handleSearchChange = event =>
    setSearch(event.target.value)

  return (
    <div>
      <h1>Data for countries</h1>
      <div>
        <input type="text" placeholder='search for country' value={searchQuery} onChange={handleSearchChange} />
      </div>

      <Results query={searchQuery} countries={countries} />
    </div>
  )
}

export default App
