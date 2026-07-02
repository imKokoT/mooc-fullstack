import { 
  useState,
  useEffect
} from 'react'
import CountriesService from './service/access_countries'

const MAX_RESULTS = 10


function CountryElement({country}){
  return (
    <li>
      {country.name.common} <button>Show details</button>
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
  }, [])
  
  if (!query)
    return <div>...</div>

  if (!countries)
    return <div>An error occurred while fetch data about countries</div>

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
          {results.map(c => <CountryElement country={c}/>)}
        </ul>
      </div>
    )
  // single
  else if (results.length === 1)
    return (
      <div>
        Country details...
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
