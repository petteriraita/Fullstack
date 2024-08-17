import personJSservice from "../services/personJSservice"
const Persons = ({ personsToShow }) => {

  // console.log("the Persons component is called")

  const deleteUIHandler = (event, newName, id) => {

    // event.preventDefault() // stopping the refresh of the page
    if (window.confirm(`Delete ${newName} ?`)) {
      personJSservice.deleteHandler(newName, id)
      console.log(`confirmation done`)
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