import { useEffect, useState } from 'react'
import Search from './Components/search'
import Results from './Components/results'
import apiService from './Services/apiService'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])


  return (
    <>
      <Search searchTerm = {searchTerm} setSearchTerm ={setSearchTerm}/>
      <Results searchTerm = {searchTerm} setSearchTerm ={setSearchTerm} results ={results}  setResults ={setResults}/>
    </>
  )
}

export default App
