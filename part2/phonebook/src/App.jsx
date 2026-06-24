import { useState } from 'react'

function Note({person}) {
  return <li>{person.name}: {person.number}</li>
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
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

    setPersons(persons.concat({
      id: Math.max(...persons.map(p => p.id)) + 1, // this evil stuff should be handled by backend
      name: newName,
      number: newNumber
    }))
    console.log('added', newName)
    
    // cleanup
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => 
    setNewName(event.target.value)
  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input placeholder='John Due' onChange={handleNameChange} value={newName}/> <br />
          number: <input type='tel' placeholder='0123456789' pattern='[0-9\-]+' onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <Note key={p.id} person={p}/>)}
      </ul>
    </div>
  )
}

export default App
