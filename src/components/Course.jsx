import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
  console.log('the Course component was called')
  return (
  
  
    <div>
      <Header course = {course}/>        
      <Content parts = {course.parts}/>        
    </div>
  
    
  )
}

export default Course