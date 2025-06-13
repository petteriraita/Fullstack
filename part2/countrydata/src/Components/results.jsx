import { useEffect, useState } from 'react'
import apiService from "../Services/apiService"


const Results = ({ searchTerm, setSearchTerm, results, setResults }) => {
    const [country, setCountry] = useState('')
    const [shouldResetCountry, setShouldResetCountry] = useState(false)
    // the last parameter of this is the dependency array (aka the thing that causes the change and the useeffect to happen)
    useEffect(() => {
        const fetchData = async () => {
            const data = await apiService.onSearch(searchTerm)
            setResults(data)
        }
        if (searchTerm !== '') {
            fetchData()
        }
        console.log("useEffect ran")
        setCountry('')
    }, [searchTerm])

    // useEffect(() => {
    //                     // 🔁 Schedule clearing AFTER render
    //     if (shouldResetCountry) {
    //         setShouldResetCountry(false)
    //     }
    // }, [shouldResetCountry])

    // make a filtering based on the length of the countryarray
    // console.log("RESULTS.JSX:")
    // console.log(`results from results.jsx: ${JSON.stringify(results)}`)  

    const filteredresults = results.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm)
    )

    
    
    // making a React component that is the JSX of a single country view
    const SingleCountry  = ({c}) => (
                     <>
                     {console.log('starting to run the singlecountry rendered') }
                <h2>
                    {
                        c.name.common
                    }
                </h2>
                <div>
                    Capital {c.capital}
                </div>
                <div>
                    Area {c.area}
                </div>
                <div>
                    <h2> Languages</h2>
                    {Object.values(c.languages).map(c => <div key={c}> {c} </div>)}
                </div>
                <img src={c.flags.png} />
            </>

        )


    // console.log(`filtered results from results.jsx: ${JSON.stringify(filteredresults.map(c => c.name.common))}`)  
    
    
    console.log("Program logic starts running")

    if (searchTerm === '') {
        return `start typing to discover countries`
    }
    else if (filteredresults.length > 10){
        return `too many matches, specify more characters`

    }
    else if (country !== '') {
        console.log('went to the place with non-empty result');
        console.log('country:', country);
        const c = filteredresults.find(c => c.name.common === country)
        console.log('c.name.common: ', c.name.common);
        // setShouldResetCountry(true)
        return <SingleCountry c={c} />

    }
    else if (filteredresults.length === 1 ) {
        console.log('went to the place with 1 result');
        
        console.log('country:', country);
        const c = filteredresults[0]
        return <SingleCountry c={c} />

    }
    else {
        const filteredresultsMapped = filteredresults.map(c => 
            (<div key={c.name.common}> {c.name.common}  <button onClick={() => {
                console.log("Country set")
                setCountry(c.name.common) }}
                > show </button> </div>)
    )
        // filteredresultsMapped = filteredresultsMapped.map()
        return (
            <>
                <div>
                    {
                        filteredresultsMapped
                    }
                </div>
            </>
        )
    }
}

export default Results