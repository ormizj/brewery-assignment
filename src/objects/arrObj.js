import _ from "lodash"

//TODO documentation for this file

/**
 * function created to represent the structure of "arrObj".
 * 
 * @returns {Array}
 */
export const arrObjTemplate = () => {

    const arrObjTemplate = ['i'][['state', {
        stateName: 'state',
        breweries: ['i'][['city', 'breweryId', 'street']]
    }]]

    return arrObjTemplate
}

/**
 * Complexity- Time: O(n); Space: O(n);
 * 
 * converts a clone of "mainObj" JSON object,
 * to an Array "arrObject", and returns it.
 * 
 * @param {JSON} mainObj
 * @returns {Array} param mainObj as an Array
 */
export const objToArr = (mainObj) => {
    //cloning "Obj" to remove aliasing 
    const cloneObj = _.cloneDeep(mainObj)
    const arrObj = (Object.entries(cloneObj.states))

    //creating the "breweries" array for the "arrObj"
    const tempBrews = [[]]
    arrObj.forEach((element, index) => {
        tempBrews[index] = []
        Object.entries(cloneObj.states[element[0]].breweries).forEach((brewE, brewI) => {
            tempBrews[index][brewI] = [brewE[1].city, brewE[0], brewE[1].street]
        })
        arrObj[index][1].breweries = tempBrews[index]
    })

    return arrObj
}

/**
 * Complexity- Time: O(n log n); Space: O(1);
 * 
 * sorts the param arrObj- states and breweries, alphabetically.
 * 
 * @param {Array} arrObj
 */
export const sortArrObj = (arrObj) => {
    //using generic sort instead of "localeCompare", because there is a capitalization rule
    arrObj.sort()
    for (let i = 0; i < arrObj.length; i++)
        arrObj[i][1].breweries.sort()
}