import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const getRequest = axios.get(baseUrl)
    return getRequest.then(response => response.data)
}

const updateNumber = async (newObject) => {
        console.log(`Adding a new number for the name: ${newObject.name} person`)
        console.log(`Adding a new number for the id: ${newObject.id} person`)
    try {
        const response = await axios.put(`${baseUrl}/${newObject.id}`, {
            name: newObject.name,
            number: newObject.number,
            id: newObject.id   
        })
        // console.log(`BACKEND: a successful .put request with response: ${JSON.stringify(response, null, 2)} `)
        // console.log(`BACKEND: a successful .put request with response data: ${JSON.stringify(response.data, null, 2)} `)
        return Promise.resolve({success: true, axiosResponse: response});
    }
    catch (error) {
        console.error(`a failed .put request with response error:`, error);
        return Promise.reject({success: false})
    }
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteHandler = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        // console.log(`BACKEND DELETE: Deleted post with id: ${id} and name: ${newName}`)
        // console.log(`BACKEND DELETE: the response is ${JSON.stringify(response, null, 2)}`)
        return Promise.resolve({ success: true, axiosResponse: response });
    }
    catch (error) {
        console.error(`BACKEND failed .delete request with response error:`, error);
        return Promise.reject({ success: false});
    }
}
export default {
    getAll, deleteHandler, create, updateNumber
}