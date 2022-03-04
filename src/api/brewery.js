import axios from 'axios'

//request to recieve the breweries data
export const getBreweries = async () => {
    return await axios.get("https://api.openbrewerydb.org/breweries")
}
