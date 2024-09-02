const Search = ({ searchParam, setSearchTerm }) => {
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }
    return (
        <form>
            <div>
                find countries <input
                    value={searchParam}
                    onChange={handleSearch}
                />
            </div>
        </form>
    )
}


export default Search