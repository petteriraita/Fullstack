import Part from "./Part"

const Total = ({ parts }) => {
  console.log('the Total component was called')

  const sum = parts.reduce((acc, current) => acc + current.exercises, 0, ); 
  return (

    <>
      <h3> Number of excercises: {sum}</h3> 
    </>
  
  )
}

export default Total



