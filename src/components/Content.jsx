import Part from "./Part"
import Total from "./Total"

const Content = ({ parts }) => {
  console.log('the Content component was called')

  return (

    <>
      {parts.map((mypart) => {
        console.log("Content calls Parts ")
        console.log(`mypart is ${JSON.stringify(mypart)}`)
        return <Part key = {mypart.id} part = {mypart} />
      }
    )}
      {console.log("Content calls Total")}
      {console.log(`parts are  ${JSON.stringify(parts)}`)}
      <Total parts = {parts}/>        
          
    </>
  
  )
}

export default Content

