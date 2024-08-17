import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const getRequest = axios.get(baseUrl)
    return getRequest.then(response => response.data)
}

const updateNumber = (newObject) => {
        console.log(`Adding a new number for the name: ${newObject.name} person`)
        console.log(`Adding a new number for the id: ${newObject.id} person`)
    try {
        const response = axios.put(`${baseUrl}/${newObject.id}`, {
            name: newObject.name,
            number: newObject.number,
            id: newObject.id   
        })
        return response;
    }
    catch (error) {
        console.error('Error updating element:', error);
    }
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteHandler = (newName, id) => {
    axios.delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log(`Deleted post with id: ${id} and name: ${newName}`)
        })

        .catch(error => {
            console.error(error);
        });

    console.log(`calling delete handler worked`)
}

export default {
    getAll, deleteHandler, create, updateNumber
}