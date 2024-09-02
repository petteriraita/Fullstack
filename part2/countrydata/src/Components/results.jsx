import apiService from "../Services/apiService"


const Results = ({ searchParam, setSearchTerm, results, setResults }) => {
    const handleAPISearch = () => {
        try {
            const response = apiService.onSearch()
            return response
        }
        catch (error) {
            console.log(`handleAPI failed ${error}`)
        }
    }
    const countryArray = handleAPISearch()
    // make a filtering based on the length of the countryarray
    if (searchParam === '') {
        return `start typing to discover countries`
    }
    else {
        return (
            <div>
                {`countries will appear\n\n\n
                ${JSON.stringify(countryArray)}`}
            </div>
        )
    }
}

export default Results