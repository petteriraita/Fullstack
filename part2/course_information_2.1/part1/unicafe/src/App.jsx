import { useState } from 'react'


const StatisticLine = ({text, value}) => {
  return (
  <tr>

<td>
    {text}
      </td>
      <td> 
      {value}
        </td>
  </tr>
  )
}
const Button = ({text, prop}) => (
  <button onClick={prop}>
    {text} 
  </button>
)

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  let totalSum = bad + good + neutral
  let average = (bad * -1 + good * 1 + neutral * 0) / totalSum
  let positive  = good / totalSum * 100
  
  if (totalSum === 0) {
    return (
      <div>
        No feedback given </div>
    )
  }
  
  return (
    <table>

    <tbody>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={totalSum} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive} />
      
    </tbody>
    </table>
)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  console.log('the app runs')
  const pressNeutral = () => {
    setNeutral((neutral) => neutral + 1)
  }
  const pressGood = () => {
    setGood((good) => good + 1)
  }
  const pressBad = () => {
    setBad((bad) => bad + 1)
  }

  

  return (
    <>
    
    <h1> give feedback</h1>
    <Button text="good" prop={pressGood} />
    <Button text="neutral" prop={pressNeutral} />
    <Button text="bad" prop={pressBad} />
    <h1> statistics</h1>    
    <div> 
      <Statistics good =  {good} neutral = {neutral} bad = {bad} />
    </div>
    
    </>
  )
}

export default App