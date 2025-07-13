import { useEffect, useState } from 'react'
import Search from './Components/search'
import Results from './Components/results'



function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [weatherdata, setWeatherdata] = useState([])


  return (
    <>
      <Search searchTerm = {searchTerm} setSearchTerm ={setSearchTerm}/>
      <Results searchTerm = {searchTerm} results ={results}  setResults ={setResults} weatherdata = {weatherdata} setWeatherdata= {setWeatherdata}/>
    </>
  )
}

export default App
