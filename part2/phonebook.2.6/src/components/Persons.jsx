
const Persons = ({personsToShow}) => {
    
    console.log("the Persons component is called")
    
  
  
    
  
    {/* list item*/}
    {/* unordered list*/}
    {/* <ul> 
      {personsToShow().map((per) =>
      <li key = {per.id}>  The name of the person: {per.name} {per.number} </li> 
      )}
    </ul> */}
    return (
    <ul> 
      {personsToShow().map((per) =>
      <li key = {per.id}>  The name of the person: {per.name} {per.number} </li> 
      )}
    </ul>
      
  
    )
  }
  
  export default Persons