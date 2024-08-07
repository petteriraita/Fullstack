
const Filter = ({newFilterParam, newFilterFunction}) => {

  const handleAddingFilter =  (event) => {
    // console.log(`MY event.target.value: ${event.target.value}`)
    newFilterFunction(event.target.value)
  }

  

  

  return (
    <form > 
        <div>
          filter shown with: <input
            value ={newFilterParam}
            onChange={handleAddingFilter}
            />
        </div>
      </form>
  )
}

export default Filter