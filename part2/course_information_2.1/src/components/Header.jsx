const Header = ({ course }) => {
  console.log('the Header component was called')
  return (
    <h2>{course.name}</h2>
  )
}

export default Header