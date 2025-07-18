import { useEffect, useState } from 'react'
import apiService from "../Services/apiService"


const Results = ({ searchTerm, results, setResults, weatherdata, setWeatherdata }) => {
    const imgURLstart = `https://openweathermap.org/img/wn/`
    const imgURLend = `@2x.png`
    const [country, setCountry] = useState('')
    // const [imageURL, setImageURL] = useState('')


    // NOTE: the last parameter of this useEffect is the dependency array (aka the thing that causes the change and the useeffect to happen)
    useEffect(() => {
        const fetchData = async () => {
            const data = await apiService.onSearch()
            setResults(data)
        }
        if (searchTerm !== '') {
            fetchData()
            // console.log("ran useEffect for searchTerm")
        }
        // Resetting the single country button
        setCountry('')
    }, [searchTerm])



    // NOTE: either there is a single result or the 'country' is non-empty. in the latter case we filter other countries out 
    let filteredresults = results.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    )
    if (country != '') {
        // NOTE: The case when there is the button press 'show'
        filteredresults = filteredresults.filter((countryelem) => countryelem.name.common === country)
        
    }

    // update the latitude and longitude when results update and there is only 1 country
    useEffect(() => {
        // console.log("ran useEffect for singleCountryView")
        if (filteredresults.length === 1) {
            const fetchWeather = async () => {
                const data = await apiService.onSearchWeather(lat, lon)
                setWeatherdata(data)
                // console.log('weatherdata: ', data);
                // console.log('weatherdata: ', data.main);
                // console.log('weatherdata: ', data.main.temp);
            }
            const lat =(filteredresults[0].latlng[0])
            const lon = (filteredresults[0].latlng[1])
            // console.log("ran useEffect for singleCountryView and ONLY 1 COUNTRY")
            // console.log('filteredresults[0].latlng[0]: ', filteredresults[0].latlng[0]);
            // console.log('filteredresults useEffect: lat: ', lat);
            // console.log('filteredresults useEffect: lon: ', lon);

            fetchWeather()

        }


    }, [results])

    // console.log('open: weatherdata: ', weatherdata.main);




    // making a React component that is the JSX of a single country view
    const SingleCountry = ({ c, weather }) => (
        <>
            {/* const temp ={ weather.main.temp } */}
            {console.log('starting to run the singlecountry rendered')}
            {/* {console.log('open: weatherdata: ', weatherdata.main)} */}
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
                {c.languages && Object.keys(c.languages).length > 0 ? (
                    Object.values(c.languages).map(lang => <div key={lang}> {lang} </div>)
                    ) : (
                        <div>
                        no languages
                        </div>
                        )}
            </div>
            <img src={c.flags.png} />
            < WeatherProp c={c} weather ={weather} />

        </>
    )

    // console.log('JSON.stringify(weatherdata): ', JSON.stringify(weatherdata));
    const imageURL =  (weatherdata.weather && weatherdata.weather.length > 0) ? (
        // console.log('JSON.stringify(weatherdata): ', JSON.stringify(weatherdata.weather));
        // console.log('JSON.stringify(weatherdata): ', JSON.stringify(weatherdata.weather[0]));
        imgURLstart + weatherdata.weather[0].icon + imgURLend
        // console.log('imageURL: ', imageURL);
    ) : ''
    const WeatherProp = ({ c, weather }) => (
        <div>
            <h2>Weather in {c.capital}</h2>
            { !weather?.main || !weatherdata?.weather ? (
                <p>loading weather...</p>
            ) : (
                <>
                    <div>Temperature: {weather.main.temp} °C</div>
                    <img
                        src={imageURL}
                    />
                    <div>Wind: {weather.wind.speed} m/s</div>
                </>
            )}
        </div>
    )


    // console.log("Program logic starts running")
    if (searchTerm === '') {
        return `start typing to discover countries`
    }
    else if (filteredresults.length > 10) {
        return `too many matches, specify more characters`
    }
    else if (filteredresults.length === 1) {
        // console.log('filteredresults[0].name.common: ', filteredresults[0].name.common);
        const c = filteredresults[0]

        return <SingleCountry c={c} weather = {weatherdata}/>
    }
    else {
        const filteredresultsMapped = filteredresults.map(c =>
        (<div key={c.name.common}> {c.name.common}  <button onClick={() => {
            // console.log("Country set")
            setCountry(c.name.common)
        }}
        > show </button> </div>)
        )
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