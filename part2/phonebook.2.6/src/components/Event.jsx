const Event = ({commonEventHandler, newName, setNewName, newNumber, setNewNumber }) => {
  const handleAddingName = (event) => {
    // console.log(`MY event.target.value: ${event.target.value}`)
    setNewName(event.target.value)
  }
  const handleAddingNumber = (event) => {
    // console.log(`MY event.target.value: ${event.target.value}`)
    setNewNumber(event.target.value)
  }




  return (
    <>
      <form onSubmit={commonEventHandler}>
        <div>
          name: <input
            value={newName}
            onChange={handleAddingName} />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleAddingNumber}
          />
        </div>
        <div>
          <button type="submit">click to add to persons</button>
        </div>
      </form>
    </>

  )
}

export default Event