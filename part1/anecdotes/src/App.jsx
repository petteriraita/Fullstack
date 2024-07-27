import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  // const [votes, setVotes] = useState(0)

  const [voteArray, setVotes] = useState(Array(anecdotes.length).fill(0))

  console.log('the app runs')

  
  const setRandomAnecdote = () => {
    console.log('anecdote clicked ' + selected)
    setSelected((selected) => Math.floor(Math.random()  * anecdotes.length))
    console.log('anecdote clicked selected now ' + selected)
  }
  console.log()
  const handleVotes = () => {
      console.log('voting clicked ')
      console.log('voteArray: ' + voteArray)
      const copy  = [...voteArray]
      copy[selected] += 1
      setVotes(copy)
      
      console.log('voting copy ' + copy)
      return voteArray[selected]
  }
  const mostPopAnec = () => {
    const indexOfMax = voteArray.indexOf(Math.max(...voteArray))
    return anecdotes[indexOfMax]
  }
  return (
    <>
      <div>
        {anecdotes[selected]}
      </div>
      <p>
        has {voteArray[selected]} votes
      </p>
      <button onClick = {() => {
        handleVotes()
        
      }}>
        vote
      </button>
      <button onClick = {() => {
        setRandomAnecdote()
      }}>
        next anecdote
      </button>
      <h2>
        Anecdote with most votes 
      </h2>
      <div>
        {mostPopAnec()}
      </div>
      
    </>
  )
}

export default App