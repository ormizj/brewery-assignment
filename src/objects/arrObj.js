import _ from "lodash"

//TODO documentation for this file

/**
 * Complexity: Time - O(n log n); Space - O(n)
 * 
 * @param {JSON} mainObj
 * @returns {Array} "mainObj" as an Array
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

    //using generic sort instead of "localeCompare", because there is a capitalization rule
    arrObj.sort()
    for (let index = 0; index < arrObj.length; index++)
        arrObj[index][1].breweries.sort()

    return arrObj
}