import axios from 'axios'
import { 
  useState,
  useEffect,
  // amazing stuff 
  createContext,
  useContext
} from 'react'
import Notification from './components/notification'
import personService from './services/person'

// i found solution how to avoid annoying forwarding
// within react's contexts! 
const PersonsContext = createContext()


function RemovePersonButton({person}){
  const { persons, setPersons } = useContext(PersonsContext)

  const removePerson = event => {
    if (!confirm(`Are you sure to remove ${person.name}?`))
      return

    personService
      .remove(person.id)
      .then(data => {
        setPersons(persons.filter(
          p => p.id !== data.id
        ))
        console.log(`removed ${person.name}`)
      })
      .catch(error => {
        console.error('failed to remove', person)
      })
  }

  return <button className='button' onClick={removePerson}>Remove</button>
}

function Note({person}) {
  return (
    <li>
      <div className='note'>
        {person.name}: {person.number} 
        <RemovePersonButton person={person} />
      </div>
    </li>
  )
}

function Filter({ searchName, setSearchName }) {
  return (
    <div>
      search for people: <input
        placeholder='John Due'
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
      />
    </div>
  )
}

function NewPersonForm() {
  const { persons, setPersons } = useContext(PersonsContext)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.length == 0 || newNumber.length == 0) 
      return
    if (persons.map(p => p.name).includes(newName)){
      if (!confirm(`${newName} is already in the Phonebook! Do you want to override old number?`))
        return

      // update number
      const id = persons.find(p => p.name === newName).id
      const newPerson = { name: newName, number: newNumber }

      personService
        .update(id, newPerson)
        .then(person => {
          console.log('updated', person.name)
          setPersons(
            persons.map(p => p.id === person.id ? {...newPerson, id: person.id} : p)
          )

          // cleanup
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          console.error('failed to update', newName)
        })
        return
    }
    if (persons.map(p => p.number).includes(newNumber)){
      alert(`${newNumber} is already in the Phonebook!`)
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }

    personService.add(person)
    .then(data => {
      setPersons(persons.concat(data))
      console.log('added', newName)

      // cleanup
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.error('failed add person:', error)
      alert(`An error occurred while adding new person: ${error.code}`)
    })
  }

  const handleNameChange = (event) => 
    setNewName(event.target.value)
  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input placeholder='John Due' onChange={handleNameChange} value={newName}/> <br />
        number: <input type='tel' placeholder='012-345-6789' pattern='[0-9\-]+' onChange={handleNumberChange} value={newNumber}/>
      </div>
      <div>
        <button className='button' type="submit">add</button>
      </div>
    </form>
  )
}

function Persons({persons}) {
  return(
    <ul>
      {persons.map(p => <Note key={p.id} person={p}/>)}
    </ul>
  )
}

function App() {
  const [persons, setPersons] = useState([]) 
  const [searchName, setSearchName] = useState('')
  const [newNotification, setNotification] = useState(null) // or {message, msgType}

  const showList = searchName.length ? persons.filter(person => person.name
                                          .toLowerCase()
                                          .startsWith(
                                            searchName.toLowerCase()
                                          )
                                       ) : 
                                       persons;

  /* 
  runs after first render; then rerender
  
  ---
  since React .18 effects called twice while dev run because of strict mode
    <StrictMode>
      <App />
    </StrictMode>
  when run release it behaves as it expected
  */
  useEffect(() => {
    console.debug('fetching persons')

    personService
    .getAll()
    .then(data => {
      setPersons(data)
      console.debug('fetched', data.length, 'notes')
    })
    .catch(error => {
      console.error('failed fetch persons:', error)
    })
  },
  [])

  return (
    <div>
      <PersonsContext.Provider value={{ persons, setPersons }}>
        <h1>Phonebook</h1>
        <Notification notification={newNotification}/>
        <Filter searchName={searchName} setSearchName={setSearchName} />

        <h2>Add person</h2>
        <NewPersonForm/>

        <h2>Numbers</h2>
        <Persons persons={showList}/>
      </PersonsContext.Provider>
    </div>
  )
}

export default App
