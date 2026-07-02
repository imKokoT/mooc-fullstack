import { 
  useState,
  useEffect
} from 'react'
import CountriesService from './service/access_countries'


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
    return

  if (!countries)
    return (
      <div>
        An error occurred while fetch data about countries 
      </div>
    )

  return (
    <div>
      test
    </div>
  )
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
