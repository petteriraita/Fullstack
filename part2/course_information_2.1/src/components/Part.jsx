const Part = ({ part }) => {
  console.log('the Part component was called')
  return (
    <div>
    <p>
      {part.name} {part.exercises}
    </p>

    </div>
  )
}


export default Part