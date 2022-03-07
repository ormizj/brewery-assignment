import _ from "lodash"

/**
 * function created to represent the structure of "arrObj".
 * 
 * @returns {Array}
 */
export const arrObjTemplate = () => {

    const arrObjTemplate = [0][['state', {
        stateName: 'state',
        breweries: [0][['city', 'breweryId', 'street']]
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
// export const objToArr = (mainObj) => {
//     //cloning "Obj" to remove aliasing 
//     const cloneObj = _.cloneDeep(mainObj)
//     const arrObj = (Object.entries(cloneObj.states))

//     //creating the "breweries" array for the "arrObj"
//     const tempBrews = [[]]
//     arrObj.forEach((element, index) => {
//         tempBrews[index] = []
//         Object.entries(cloneObj.states[element[0]].breweries).forEach((brewE, brewI) => {
//             tempBrews[index][brewI] = [brewE[1].city, brewE[0], brewE[1].street]
//         })
//         arrObj[index][1].breweries = tempBrews[index]
//     })

//     return arrObj
// }

export const objToArr = (mainObj) => {
    //cloning "Obj" to remove aliasing 
    const arrObj = []
    const states = Object.keys(mainObj.states)

    for (let state of states) {
        arrObj.push([state])
        arrObj[arrObj.length - 1][1] = {
            stateName: state,
            breweries: []
        }

        Object.entries(mainObj.states[state].breweries).forEach((brewery, index) => {
            arrObj[arrObj.length - 1][1].breweries[index] = [brewery[1].city]
            arrObj[arrObj.length - 1][1].breweries[index][brewery[0]] = mainObj.states[state].breweries[brewery[0]]
        })
    }


    arrObj[1][1].breweries[0]['10-barrel-brewing-co-bend-1'].city = '###########################'



    console.log(mainObj, 50)
    console.log(arrObj, 100)



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