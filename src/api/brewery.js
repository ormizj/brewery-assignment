import axios from 'axios'

/**
 * @returns {Promise} containing the Brewery Database
 */
export const getBreweries = async () => {
    return await axios.get("https://api.openbrewerydb.org/breweries").then(response => {
        if (!response.data) throw response;
        return response.data
    }).catch(error => {
        console.error(error)
        alert("There was a problem with the request")
    })
}
