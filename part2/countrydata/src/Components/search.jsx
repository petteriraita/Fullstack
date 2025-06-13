const Search = ({ searchTerm, setSearchTerm }) => {
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }
    return (
        <form>
            <div>
                find countries <input
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </form>
    )
}


export default Search