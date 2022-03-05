import axios from 'axios'

/**
 * @returns {Promise} containing the Brewery Database
 */
export const getBreweries = async () => {
    return await axios.get("https://api.openbrewerydb.org/breweries")
}
