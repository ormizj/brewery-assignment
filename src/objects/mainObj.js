import _ from "lodash"
import { returnWord } from "../utils/stringUtil"

//TODO documentation for this file

/**
 * function that returns the "mainObj" structure 
 * (created for representation)
 * 
 * @returns "mainObj" template object
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

    return objTemplate
}

/**
 * 
 * @param {JSON} mainObj
 * @param {JSON} values 
 */
export const objInsert = (mainObj, values) => {
    objValueToWord(values)

    //creating the state "key", if it doesn't exist
    if (!mainObj.states[values.state]) {
        mainObj.states[values.state] = {
            stateName: values.state,
            breweries: {}
        }
    }

    //creating the brewery
    mainObj.states[values.state].breweries[values.brewery] = {
        city: values.city,
        street: values.street
    }
}

export const objDelete = (mainObj, { state, brewery }) => {
    //if state doesn't exists, return
    if (!mainObj.states[state]) return

    delete mainObj.states[state].breweries[brewery]
    if (_.isEmpty(mainObj.states[state].breweries))
        delete mainObj.states[state]
    return mainObj
}

export const formatObjInput = (input) => {
    objValueToWord(input)

    input.state = _.startCase(_.toLower(input.state))
    input.city = _.startCase(_.toLower(input.city))
    input.street = _.startCase(_.toLower(input.street))
    input.brewery = input.brewery.replace(/ /g, '-')
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
    let brew = { state, brewery }

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

const objValueToWord = (values) => {
    values.state = returnWord(values.state)
    values.city = returnWord(values.city)
    values.street = returnWord(values.street)
}

export default mainObjTemplate