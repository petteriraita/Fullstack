import { useState } from 'react'
import Search from './Components/search'
import Results from './Components/results'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState('')

  return (
    <>
      <Search searchParam = {searchTerm} setSearchTerm ={setSearchTerm}/>
      <Results searchParam = {searchTerm} setSearchTerm ={setSearchTerm}results ={results}  setResults ={setResults}/>
    </>
  )
}

export default App
