import _ from "lodash"
import { returnWord } from "../utils/stringUtil"

//TODO documentation for this file

/**
 * function created to represent the structure of "mainObj".
 * 
 * @returns {JSON} JSON object with the key "states" without values.
 */
const mainObjTemplate = () => {

    const objTemplate = {
        states: {
            '': {
                stateName: '',
                breweries: {
                    '': {
                        city: '',
                        street: ''
                    }
                }
            }
        }
    }

    delete objTemplate.states['']
    return objTemplate
}

/**
 * Complexity- Time: O(1); Space: O(1);
 * 
 * inserts into param mainObj, the param Object.
 * 
 * @param {JSON} mainObj
 * @param {JSON} Object containing required values to create a brewery.
 */
export const objInsert = (mainObj, brew) => {
    objValueToWord(brew)
    const { state, brewery, city, street } = brew

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
export const objDelete = (mainObj, { state, brewery }) => {
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
 * for the brewery String, only replaces " " with a "-".
 * 
 * @param {Object} Object containing required values to create a brewery.
 */
export const formatObjInput = (brew) => {
    objValueToWord(brew)

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
export const findBrew = (mainObj, { state, brewery }) => {
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
 * changes the param brew Strings to actual words.
 * 
 * @param {JSON} brew
 */
const objValueToWord = (brew) => {
    brew.state = returnWord(brew.state)
    brew.city = returnWord(brew.city)
    brew.street = returnWord(brew.street)
}

export default mainObjTemplate