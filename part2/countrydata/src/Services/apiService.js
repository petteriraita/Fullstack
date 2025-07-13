import axios from "axios";

const baseURL = `https://studies.cs.helsinki.fi/restcountries/api/`
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?`

const onSearch = async () => {
    try {
        const response = await axios
            .get(`${baseURL}all`)
        // console.log(`the onSearch response worked: `)
        // console.log(`${JSON.stringify(response.data)}`)
        // console.log(`results from apiservice.js: ${JSON.stringify(response.data)}`)
        return response.data
    }
    catch (error) {
        console.error(`BACKEND failed .get request with response error:`, error);
    }
}

const onSearchWeather = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!lat || !lon || !apiKey) {
        console.log('onSearchWeather ERROR: failing values');

        console.log('lat: ', lat);
        console.log('lon: ', lon);
        console.log('apiKey: ', apiKey);

    }
    try {
        const response = await axios
            .get(`${weatherURL}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        return response.data
    }
    catch (error) {
        console.error(`BACKEND failed .get request with response error:`, error);
    }
}


export default {
    onSearch, onSearchWeather
}