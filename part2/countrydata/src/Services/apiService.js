import axios from "axios";

const baseURL = `https://studies.cs.helsinki.fi/restcountries/api/`

const onSearch = async () => {
    try {
        const response = await axios
            .get(`${baseURL}all`)
        console.log(`the onSearch response worked: `)
        // console.log(`${JSON.stringify(response.data)}`)
        return response.data
    }
    catch (error) {
        console.error(`BACKEND failed .get request with response error:`, error);
    }
}

export default {
    onSearch
}    