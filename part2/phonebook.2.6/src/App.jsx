import Filter from './components/Filter'
import Event from './components/Event'
import Persons from './components/Persons'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsToShow =() => {
    if (newFilter === '') {
      return persons
    }
    else {
      return persons.filter(per => per.name.toLowerCase().includes(newFilter.toLowerCase()))

    }
  }

  const getNextId = () => {
    return Math.max(...persons.map(p => p.id)) + 1
  }

  window.getNextId = getNextId


  const commonEventHandler = (event) => {
    
    event.preventDefault() // stopping the refresh of the page
    console.log('Button clicked', event.target)
    if (persons.find(per => per.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)

    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: getNextId()
      }
      setPersons(persons.concat(newPerson))
      setNewName('') // clear the input field
      setNewNumber('') // clear the input field

    }
     
  }


  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilterParam = {newFilter} newFilterFunction = {setNewFilter} />


      <Event commonEventHandler = {commonEventHandler} newName = {newName} setNewName = {setNewName} newNumber = {newNumber}  setNewNumber = {setNewNumber} />


      
      {console.log("the Persons component is called from APP")}

      <h3>Numbers</h3>
      <Persons personsToShow = {personsToShow} />


    </div>
  )
}

export default App