import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import {StateInfo} from './components/StateInfo'
import Notification from './components/Notification'
import Event from './components/Event'
import Persons from './components/Persons'
import './index.css'
import personService from './services/personJSservice'


const port = import.meta.env.VITE_API_PORT;


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setnotification] = useState(null)
  const [newFilter, setNewFilter] = useState('')



  useEffect(() => {
    console.log('useeffect ran');
    
    personService
      .getAll()
      .then(returnedPerson => {
        // console.log(`returnedPerson array: ${returnedPerson}`)
        // console.log(`returnedPerson.data array: ${returnedPerson.data}`)
        setPersons(returnedPerson)
      })
  }, [])


  const personsToShow = () => {
    console.log('callling personsToShow');
    console.log('persons: ', persons);
    
    if (newFilter === '') {
      return persons
    }
    else {
      return persons.filter(per => per.name.toLowerCase().includes(newFilter.toLowerCase()))

    }
  }

  const handleNewNotification = (type, name) => {
    console.log(`passed the ${name}`)
    if (type === 'name') {

      const name_string = `Added ${name}`
      console.log(name_string)
      setnotification(name_string)
    }
    else if (type === 'number') {

      const name_string = `Updated the number of ${name} to ${newNumber}`
      console.log(name_string)
      setnotification(name_string)
    }
    else if (type === 'delete_works') {

      const name_string = `Information of ${name} deleted successfully` 
      console.log(name_string)
      setnotification(name_string)
    }
    else if (type === 'failure') {

      const name_string = `Information of ${name} has already been removed from server`
      console.log(name_string)
      setnotification(name_string)
      console.log("the notification was SENT")
    }
    setTimeout(() => {
          setnotification(null)
        }, 5000)
  }

  const getNextId = () => {
    return (Math.max(...persons.map(p => p.id)) + 1).toString();
  }

  window.getNextId = getNextId


  const commonEventHandler = (event) => {
    const existingPerson = persons.find(per => per.name === newName)
    event.preventDefault() // stopping the refresh of the page

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the number with the new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService.updateNumber(updatedPerson)
          .then(response => {
            if (response.success) {
              setPersons(persons.map(per =>
                per.id !== existingPerson.id ? per : response.axiosResponse.data
              ))

              setNewNumber(newNumber)
              setNewName('') // clear the input field
              setNewNumber('') // clear the input field
              // console.log(`the update response.axiosResponse: ${JSON.stringify(response.axiosResponse, null, 2)}`)
              // console.log(`the update response.axiosResponse.data: ${response.axiosResponse.data}`)
              console.log(`number of name: ${newName} updated`)
              handleNewNotification('number', newName)
            }
            else {
              console.log("this should never happen as rejected promises don't go to 'then' block :)")
            }
          })
          .catch(error => {
            console.log("failure -- the promise was not a success", error)
            handleNewNotification('failure', newName)
          })
      }

    }
    else {
      handleNewNotification('name', newName)
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

  // make the stateinfo be optional
  let showstateinfo = false;
  let stateinfoComponent = null;
  if (showstateinfo) {
    stateinfoComponent = (
      <StateInfo notification={notification} newFilterParam={newFilter} newName={newName} newNumber={newNumber} persons={persons} />
    )
  }
  console.log('port: ', port);

  return (
    <div>
      {stateinfoComponent}
      <h2>Phonebook</h2>
      <Notification message={notification} />
      {/* <Notification message={notification} /> */}
      <Filter newFilterParam={newFilter} newFilterFunction={setNewFilter} />

      <h4>add a new number:</h4>

      <Event commonEventHandler={commonEventHandler} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />


      {/* {console.log("the Persons component is called from APP")} */}


      <h2>numbers</h2>
      {/*console.log(`the persons array: ${persons}`)*/}
      {/* {console.log(`the personsToShow array: ${personsToShow()}`)} */}

      <Persons handleNewNotification = {handleNewNotification} personsToShow={personsToShow} persons = {persons}  setPersons= {setPersons}/>


    </div>
  )
}

export default App