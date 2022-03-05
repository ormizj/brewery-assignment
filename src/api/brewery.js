import axios from 'axios'

/**
 * returns a promise containing the Brewery Database
 * 
 * @returns {Promise}
 */
export const getBreweries = async () => {
    return await axios.get("https://api.openbrewerydb.org/breweries")
}
