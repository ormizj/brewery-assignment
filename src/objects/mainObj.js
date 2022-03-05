import _ from "lodash"
import { returnWord } from "../utils/stringUtil"

/**
 * function created to represent the structure of "mainObj".
 * 
 * @returns {JSON}
 */
export const mainObjTemplate = () => {

    const mainObjTemplate = {
        states: {
            'state': {
                stateName: 'state',
                breweries: {
                    'breweryId': {
                        city: 'city',
                        street: 'street'
                    }
                }
            }
        }
    }

    return mainObjTemplate
}

/**
 * @returns {JSON} the base object needed for inserting breweries.
 */
const createMainObj = () => { return { states: {} } }

/**
 * Complexity- Time: O(1); Space: O(1);
 * 
 * inserts into param mainObj, the param Object.
 * 
 * @param {JSON} mainObj
 * @param {JSON} Object containing required values to create a brewery.
 */
export const objInsertBrew = (mainObj, brew) => {
    brewValueToWord(brew)
    const { state, brewery, city, street } = brew

    //creating states key, if missing
    if (!mainObj.states)
        mainObj.states = {}

    //creating the state "key", if it doesn't exist
    if (!mainObj.states[state]) {
        mainObj.states[state] = {
            stateName: state,
            breweries: {}
        }
    }

    //creating and inserting the brewery
    mainObj.states[state].breweries[brewery] = { city, street }
}

/**
 * Complexity- Time: O(1); Space O(1);
 * 
 * deletes a brewery from the param mainObj, based on the param Object.
 * does nothing if brewery was not found, and deletes the param mainObj state key,
 * if it contains no breweries.
 * 
 * @param {JSON} mainObj
 * @param {JSON} Object containing a brewery and its state.
 */
export const objDeleteBrew = (mainObj, { state, brewery }) => {
    //if state doesn't exists, return
    if (!mainObj.states[state]) return

    delete mainObj.states[state].breweries[brewery]
    if (_.isEmpty(mainObj.states[state].breweries))
        delete mainObj.states[state]
}

/**
 * Complexity- Time: O(1); Space: O(1);
 * 
 * capitalizes the first char of every word in the param Object Strings,
 * for the brewery String, only replaces " " with "-".
 * 
 * @param {Object} Object containing required values to create a brewery.
 */
export const formatObjBrew = (brew) => {
    brewValueToWord(brew)

    brew.state = _.startCase(_.toLower(brew.state))
    brew.city = _.startCase(_.toLower(brew.city))
    brew.street = _.startCase(_.toLower(brew.street))
    brew.brewery = brew.brewery.replace(/ /g, '-')
}

/**
 * Complexity- Time: O(n); Space O(1); [n= param mainObj states]
 * 
 * @param {JSON} mainObj 
 * @param {JSON} Object containing a brewery.
 * @returns {Boolean} {true} if the param Object exists in the param mainObj.
 */
export const isBrewExist = (mainObj, { brewery }) => {
    for (let state of Object.values(mainObj.states)) {
        if (state.breweries[brewery])
            return true
    }
    return false;
}

/**
 * Complexity- Time: O(1); Space: O(1);
 * 
 * finds and returns a brewery with complete information, from param mainObj.
 * 
 * @param {JSON} mainObj 
 * @param {JSON} Object containing a state and brewery.
 * @returns {Object} a brewery containing complete information.
 *                   undefined if no brewery was found.
 */
export const objFindBrew = (mainObj, { state, brewery }) => {
    const brew = { state, brewery }

    //if state doesn't exists, return
    if (!mainObj.states[state]) return
    const mainObjBrewery = mainObj.states[state].breweries[brewery]

    if (mainObjBrewery) {
        brew.street = mainObjBrewery.street
        brew.city = mainObjBrewery.city
        return brew
    }
}

/**
 * Complexity- Time: O(1); Space: O(1);
 * 
 * changes the param brew Strings, to actual words.
 * 
 * @param {JSON} brew
 */
const brewValueToWord = (brew) => {
    brew.state = returnWord(brew.state)
    brew.city = returnWord(brew.city)
    brew.street = returnWord(brew.street)
}

export default createMainObj