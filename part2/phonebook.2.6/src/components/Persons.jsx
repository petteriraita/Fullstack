import personJSservice from "../services/personJSservice"
const Persons = ({handleNewNotification, personsToShow, persons, setPersons}) => {

  // console.log("the Persons component is called")

  const deleteUIHandler = (event, newName, id) => {

    event.preventDefault() // stopping the refresh of the page
    if (window.confirm(`Delete ${newName} ?`)) {
      personJSservice.deleteHandler(id)
        .then(response => {
          if (response.success) {
            console.log("success -- the delete promise was a success")
            setPersons(persons.filter(p => p.id !== id))
                    // console.log(`the response is ${JSON.stringify(response, null, 2)}`)
                    // console.log(`the response axios is ${JSON.stringify(response.axiosResponse, null, 2)}`)
            console.log(`the newname.... ${newName}`)
            handleNewNotification('delete_works', newName)
          }
          else {
            console.log("this should never happen as rejected promises don't go to 'then' block :)")
          }
        })
        .catch(error =>  {
            console.log("promise rejected -- notifying failure")
            handleNewNotification('failure', newName)
        })
    }
  }
  {/* list item*/ }
  {/* unordered list*/ }
  {/* <ul> 
      {personsToShow().map((per) =>
      <li key = {per.id}>  The name of the person: {per.name} {per.number} </li> 
      )}
    </ul> */}
  return (
    <ul>
      {personsToShow().map((per) =>
        <li key={per.id}>
          {per.name} {per.number}
          <form onSubmit={(event) => deleteUIHandler(event, per.name, per.id)}
            style={{ display: 'inline' }}>
            <button type="submit"> delete </button>
          </form>
        </li>
      )}
    </ul>


  )
}

export default Persons