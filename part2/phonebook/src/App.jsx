import axios from 'axios'
import { useState, useEffect } from 'react'

function Note({person}) {
  return <li>{person.name}: {person.number}</li>
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

function NewPersonForm({persons, setPersons}) {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.length == 0 || newNumber.length == 0) 
      return
    if (persons.map(p => p.name).includes(newName)){
      alert(`${newName} is already in the Phonebook!`)
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

    axios
    .post('http://localhost:3000/persons', person)
    .then(response => {
      setPersons(persons.concat(response.data))
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
        <button type="submit">add</button>
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

    axios
    .get('http://localhost:3000/persons')
    .then(response => {{
      setPersons(response.data)
      console.debug('fetched', response.data.length, 'notes')
    }
    })
    .catch(error => {
      console.error('failed fetch persons:', error)
    })
  },
  [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h2>Add person</h2>
      <NewPersonForm persons={persons} setPersons={setPersons}/>

      <h2>Numbers</h2>
      <Persons persons={showList}/>
    </div>
  )
}

export default App
