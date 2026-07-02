import { 
  useState,
  useEffect
} from 'react'
import CountriesService from './service/access_countries'

const MAX_RESULTS = 10


function CountryDetails({country}) {
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
    </div>
  )
}

function CountryElement({country, setCountries}) {
  const [show, setShow] = useState(null)

  const showDetails = event => {
    setCountries([country])
  }

  return (
    <li>
      {country.name.common} <button onClick={showDetails}>Show details</button>
    </li>
  )
}

function Results({query}) {
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
  }, [query])
  
  if (!query)
    return <div>...</div>

  if (!countries)
    return <div>An error occurred while fetch data about countries</div>

  // simple and effective search, works even with countries
  // like Sudan and South Sudan. maybe i had to implement
  // search within regex patterns but i think it's not required
  // for this small search set of 250 countries.
  const results = countries.filter(
    c => c.name.common
      .toLowerCase()
      .startsWith(
        query.toLowerCase()
      )
  )

  // to many
  if (results.length > MAX_RESULTS)
    return <div>Too many results</div>
  // up to MAX_RESULTS results
  else if (results.length > 1)
    return (
      <div>
        <ul>
          {results.map(c => <CountryElement key={c.name.common} country={c} setCountries={setCountries}/>)}
        </ul>
      </div>
    )
  // single
  else if (results.length === 1)
    return (
      <div>
        <CountryDetails country={results[0]}/>
      </div>
    )
  // no results
  else
    return <div>No search results...</div>
}

function App() {
  const [searchQuery, setSearch] = useState('')

  const handleSearchChange = event =>
    setSearch(event.target.value)

  return (
    <div>
      <h1>Data for countries</h1>
      <div>
        <input type="text" placeholder='search for country' value={searchQuery} onChange={handleSearchChange} />
      </div>

      <Results query={searchQuery} />
    </div>
  )
}

export default App
