import { useState } from 'react'

function Note({person}) {
  return <li>{person.name}</li>
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.length == 0) 
      return

    if (persons.map(p => p.name).includes(newName)){
      alert(`${newName} is already in the Phonebook!`)
      return
    }

    setPersons(persons.concat({
      id: Math.max(...persons.map(p => p.id)) + 1, // this evil stuff should be handled by backend
      name: newName
    }))
    console.log('added', newName)
    
    // cleanup
    setNewName('')
  }

  const handleNameChange = (event) => 
    setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input placeholder='John Due' onChange={handleNameChange} value={newName}/>
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
