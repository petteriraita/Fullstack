export const StateInfo = ({newFilterParam, newName, newNumber, notification, persons}) => {
  return(
      <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
        <h3>Current State</h3>
        <p><strong>New Name:</strong> {newName}</p>
        <p><strong>New Number:</strong> {newNumber}</p>
        <p><strong>Filter:</strong> {newFilterParam}</p>
        <p><strong>Notification:</strong> {notification}</p>
        <p><strong>Persons:</strong> {JSON.stringify(persons, null, 2)}</p>
      </div>
  )   
}