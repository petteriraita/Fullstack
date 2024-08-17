import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Event from './components/Event'
import Persons from './components/Persons'
import personService from './services/personJSservice'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')



  useEffect(() => {
    personService
      .getAll()
      .then(returnedPerson => {
        // console.log(`returnedPerson array: ${returnedPerson}`)
        // console.log(`returnedPerson.data array: ${returnedPerson.data}`)
        setPersons(returnedPerson)
      })
  }, [])


  const personsToShow = () => {
    if (newFilter === '') {
      return persons
    }
    else {
      return persons.filter(per => per.name.toLowerCase().includes(newFilter.toLowerCase()))

    }
  }

  const getNextId = () => {
    return (Math.max(...persons.map(p => p.id)) + 1).toString();
  }

  window.getNextId = getNextId


  const commonEventHandler = (event) => {
    console.log(`the event handler starts`)
    const existingPerson = persons.find(per => per.name === newName)
    event.preventDefault() // stopping the refresh of the page
    console.log('Button clicked', event.target)


    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the number with the new one?`)) {
        console.log(`Adding a new number for the name: ${existingPerson.name} person`)
        console.log(`Adding a new number for the id: ${existingPerson.id} person`)
        const updatedPerson = { ...existingPerson, number: newNumber }
        console.log(`updatedPerson: Adding a new number for the name: ${updatedPerson.name} person`)
        console.log(`updatedPerson: Adding a new number for the id: ${updatedPerson.id} person`)
        personService.updateNumber(updatedPerson)
          .then(response => {
            setPersons(persons.map(per => 
              per.id != existingPerson.id ? per : response.data 
            ))
            setNewNumber(newNumber)
            setNewName('') // clear the input field
            setNewNumber('') // clear the input field
            console.log(`the update response: ${response.data}`)
          })
        console.log(`number of name: ${newName} updated`)
      }

    }
    else {
      createNewPerson()
    }

  }

  const createNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
      id: getNextId()
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('') // clear the input field
        setNewNumber('') // clear the input field

      })

  }
  // Expose a function to change the name from the console
  window.changeName = (newNameValue) => {
    setNewName(newNameValue);
  };

  return (
    <div>
      <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
        <h3>Current State</h3>
        <p><strong>New Name:</strong> {newName}</p>
        <p><strong>New Number:</strong> {newNumber}</p>
        <p><strong>Filter:</strong> {newFilter}</p>
        <p><strong>Persons:</strong> {JSON.stringify(persons, null, 2)}</p>
      </div>
      <h2>Phonebook</h2>

      <Filter newFilterParam={newFilter} newFilterFunction={setNewFilter} />

      <h2>add a new</h2>

      <Event commonEventHandler={commonEventHandler} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />



      {/* {console.log("the Persons component is called from APP")} */}


      <h2>numbers</h2>
      {/*console.log(`the persons array: ${persons}`)*/}
      {/* {console.log(`the personsToShow array: ${personsToShow()}`)} */}

      <Persons personsToShow={personsToShow} />


    </div>
  )
}

export default App