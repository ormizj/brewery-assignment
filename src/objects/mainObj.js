import _ from "lodash"
import { returnWord } from "../utils/stringUtil"

//TODO documentation for this file

/**
 * function that returns the "mainObj" structure (created for representation)
 * 
 * @returns {JSON} "mainObj" template
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

export const objInsert = (mainObj, { state, brewery, city, street }) => {
    ({ state, city, street } = objValueToWord({ state, city, street }))

    //creating the state "key", if it doesn't exist
    if (!mainObj.states[state]) {
        mainObj.states[state] = {
            stateName: state,
            breweries: {}
        }
    }

    //creating the brewery and returning them
    mainObj.states[state].breweries[brewery] = { city, street }

    return mainObj
}

export const objDelete = (mainObj, { state, brewery }) => {
    //if state doesn't exists, return
    if (!mainObj.states[state]) return

    delete mainObj.states[state].breweries[brewery]
    if (_.isEmpty(mainObj.states[state].breweries))
        delete mainObj.states[state]
}

export const formatObjInput = ({ state, city, street, brewery }) => {
    ({ state, city, street } = objValueToWord({ state, city, street }))

    state = _.startCase(_.toLower(state))
    city = _.startCase(_.toLower(city))
    street = _.startCase(_.toLower(street))
    brewery = brewery.replace(/ /g, '-')

    return { state, city, street, brewery }
}

export const isBrewExist = (mainObj, { brewery }) => {
    const states = Object.values(mainObj.states)

    for (let state of states) {
        if (state.breweries[brewery])
            return true
    }
    return false;
}

export const findBrew = (mainObj, { state, brewery }) => {
    const brew = { state, brewery }

    //if state doesn't exists, return
    if (!mainObj.states[state]) return
    const mainObjBrew = mainObj.states[state].breweries[brewery]

    if (mainObjBrew) {
        brew.street = mainObjBrew.street
        brew.city = mainObjBrew.city
        return brew
    }
    return null
}

const objValueToWord = ({ state, city, street }) => {
    state = returnWord(state)
    city = returnWord(city)
    street = returnWord(street)

    return { state, city, street }
}

export default mainObjTemplate